import torch
from torch_geometric.data import Data
from scipy.spatial.distance import euclidean
import numpy as np
import pandas as pd
import torch_geometric.nn


NUM_GROCERY_STORES = 100
NUM_FOOD_BANKS = 50


np.random.seed(31)

def generate_grocery_stores(num_stores):
    stores = []
    for i in range(num_stores):
        store = {
            'Store_ID': f'Store_{i+1}',
            'Excess_Food_Capacity': np.random.randint(0, 500), 
            '%Perishable': np.random.uniform(10, 90),
            '%Non_Perishable': np.random.uniform(10, 90),
            '%Essentials': np.random.uniform(20, 80),
            '%Non_Essentials': np.random.uniform(20, 80),
            'Location_X': np.random.uniform(0, 100), 
            'Location_Y': np.random.uniform(0, 100),  
        }
      
        total = store['%Perishable'] + store['%Non_Perishable']
        store['%Perishable'] = (store['%Perishable'] / total) * 100
        store['%Non_Perishable'] = (store['%Non_Perishable'] / total) * 100

        total = store['%Essentials'] + store['%Non_Essentials']
        store['%Essentials'] = (store['%Essentials'] / total) * 100
        store['%Non_Essentials'] = (store['%Non_Essentials'] / total) * 100

        stores.append(store)
    return pd.DataFrame(stores)


def generate_food_banks(num_banks):
    banks = []
    for i in range(num_banks):
        bank = {
            'Bank_ID': f'Bank_{i+1}',
            'Current_Food_Demand': np.random.randint(30, 300),
            '%Perishable_Demand': np.random.uniform(10, 90),
            '%Non_Perishable_Demand': np.random.uniform(10, 90),
            '%Essentials_Demand': np.random.uniform(20, 80),
            '%Non_Essentials_Demand': np.random.uniform(20, 80),
            'Location_X': np.random.uniform(0, 100),  
            'Location_Y': np.random.uniform(0, 100),  
        }
      
        total = bank['%Perishable_Demand'] + bank['%Non_Perishable_Demand']
        bank['%Perishable_Demand'] = (bank['%Perishable_Demand'] / total) * 100
        bank['%Non_Perishable_Demand'] = (bank['%Non_Perishable_Demand'] / total) * 100

        total = bank['%Essentials_Demand'] + bank['%Non_Essentials_Demand']
        bank['%Essentials_Demand'] = (bank['%Essentials_Demand'] / total) * 100
        bank['%Non_Essentials_Demand'] = (bank['%Non_Essentials_Demand'] / total) * 100

        banks.append(bank)

    return pd.DataFrame(banks)

def create_data(grocery_stores, food_banks):
    edge_ind = []
    edge_attr = []
    node_feature_vector = []

    for _, store in grocery_stores.iterrows():
        node_feature_vector.append([
            store['Excess_Food_Capacity'],
            store['%Perishable'],
            store['%Non_Perishable'],
            store['%Essentials'],
            store['%Non_Essentials']
        ])
    for _,bank in food_banks.iterrows():
        node_feature_vector.append([
            bank['Current_Food_Demand'],
            bank['%Perishable_Demand'],
            bank['%Non_Perishable_Demand'],
            bank['%Essentials_Demand'],
            bank['%Non_Essentials_Demand']
        ])

    for store_index, store in grocery_stores.iterrows():
        for bank_index, bank in food_banks.iterrows():
            distance = euclidean([store['Location_X'], store['Location_Y']], [bank['Location_X'], bank['Location_Y']])
            normalized_distance = distance / 100

            perish_compat = 1 - abs(store['%Perishable'] - bank['%Perishable_Demand']) / 100
            nonperish_compat = 1 - abs(store['%Non_Perishable'] - bank['%Non_Perishable_Demand']) / 100
            essentials_compat = 1 - abs(store['%Essentials'] - bank['%Essentials_Demand']) / 100
            nonessentials_compat = 1 - abs(store['%Non_Essentials'] - bank['%Non_Essentials_Demand']) / 100

            supplu_demand_compat = (perish_compat + nonperish_compat + essentials_compat + nonessentials_compat) / 4

            edge_weight = (0.6 * normalized_distance) + (0.4 * supplu_demand_compat)


            edge_ind.append([store_index, NUM_GROCERY_STORES + bank_index])
            edge_attr.append([edge_weight])

    x = torch.tensor(node_feature_vector, dtype=torch.float)
    edge_index = torch.tensor(edge_ind, dtype=torch.long).t().contiguous()
    edge_attr = torch.tensor(edge_attr, dtype=torch.float)

    return Data(x=x, edge_index=edge_index, edge_attr=edge_attr)

grocery_store = generate_grocery_stores(NUM_GROCERY_STORES)
food_bank = generate_food_banks(NUM_FOOD_BANKS)
data = create_data(grocery_store, food_bank)



import torch
import torch.nn.functional as F
from torch_geometric.nn import GCNConv, SAGEConv, GATConv, GINConv, global_mean_pool
from torch_geometric.data import Data, DataLoader

class FoodBankGNN(torch.nn.Module):
    def __init__(self, input, hidden, output):
        super(FoodBankGNN, self).__init__()
        self.conv1 = GCNConv(input, hidden)
        self.conv2 = GCNConv(hidden, hidden)
        self.conv3 = GCNConv(hidden, output)

        self.edge_mlp = torch.nn.Sequential(
            torch.nn.Linear(2 * output, hidden),
            torch.nn.ReLU(),
            torch.nn.Linear(hidden, 1)
        )

    def forward(self,data):
        x, edge_index = data.x, data.edge_index
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.conv2(x, edge_index)
        x = F.relu(x)
        x = self.conv3(x, edge_index)

        row, col = edge_index
        edge_features = torch.cat([x[row], x[col]], dim=1)
        edge_scores = self.edge_mlp(edge_features)

        return edge_scores.squeeze()



def train(model, loader, optimizer, criterion, epochs=300):
    model.train()
    for epoch in range(epochs):
        total_loss = 0
        for data in loader:
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, data.edge_attr.squeeze())
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f"Epoch {epoch} Loss: {total_loss}")

def test(model, loader):
    model.eval()
    total_loss = 0
    with torch.no_grad():
        for data in loader:
            output = model(data)
            loss = F.mse_loss(output, data.edge_attr.squeeze()).item()
            total_loss += loss.item()
    print(f"eval Loss: {total_loss / len(loader)}")


