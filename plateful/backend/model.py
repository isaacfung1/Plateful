import numpy as np
import pandas as pd
from scipy.spatial.distance import euclidean
import torch
from torch_geometric.data import Data
from torch_geometric.nn import GATConv

# Constants
NUM_GROCERY_STORES = 150
NUM_FOOD_BANKS = 40

# Generate stores
def generate_grocery_stores(num_stores):
    stores = []
    for i in range(num_stores):
        store = {
            'Store_ID': f'Store_{i+1}',
            'Excess_Food_Capacity': np.random.randint(0, 500),
            '%Perishable': np.random.uniform(10, 90),
            '%Essentials': np.random.uniform(20, 80),
            'Location_X': np.random.uniform(0, 100),
            'Location_Y': np.random.uniform(0, 100),
        }
        stores.append(store)
    return pd.DataFrame(stores)

# Generate banks
def generate_food_banks(num_banks):
    banks = []
    for i in range(num_banks):
        bank = {
            'Bank_ID': f'Bank_{i+1}',
            'Current_Food_Demand': np.random.randint(30, 300),
            '%Perishable_Demand': np.random.uniform(10, 90),
            '%Essentials_Demand': np.random.uniform(20, 80),
            'Location_X': np.random.uniform(0, 100),
            'Location_Y': np.random.uniform(0, 100),
        }
        banks.append(bank)
    return pd.DataFrame(banks)

# Create PyG Data object
def create_data(grocery_stores, food_banks):
    edge_indices = []
    edge_weights = []
    node_features = []

    # Normalize store features
    for _, store in grocery_stores.iterrows():
        features = [
            store['Excess_Food_Capacity'] / 500,
            store['%Perishable'] / 100,
            store['%Essentials'] / 100,
            store['Location_X'] / 100,
            store['Location_Y'] / 100,
        ]
        node_features.append(features)

    # Normalize bank features
    for _, bank in food_banks.iterrows():
        features = [
            bank['Current_Food_Demand'] / 300,
            bank['%Perishable_Demand'] / 100,
            bank['%Essentials_Demand'] / 100,
            bank['Location_X'] / 100,
            bank['Location_Y'] / 100,
        ]
        node_features.append(features)

    # Create edges and compute edge weights
    for store_idx in range(len(grocery_stores)):
        for bank_idx in range(len(food_banks)):
            store = grocery_stores.iloc[store_idx]
            bank = food_banks.iloc[bank_idx]

            # Compatibility
            perish_compat = (store['%Perishable'] / 100) * (bank['%Perishable_Demand'] / 100)
            essentials_compat = (store['%Essentials'] / 100) * (bank['%Essentials_Demand'] / 100)
            compatibility = 0.7 * perish_compat + 0.3 * essentials_compat

            # Distance
            distance = euclidean(
                [store['Location_X'], store['Location_Y']],
                [bank['Location_X'], bank['Location_Y']]
            )
            normalized_distance = distance / 141.42  # Max distance in [0,100] grid

            # Edge weight
            edge_weight = (0.8 * compatibility) + (0.2 * (1 - normalized_distance))

            edge_indices.append([store_idx, NUM_GROCERY_STORES + bank_idx])
            edge_weights.append([edge_weight])

    x = torch.tensor(node_features, dtype=torch.float)
    edge_index = torch.tensor(edge_indices, dtype=torch.long).t().contiguous()
    edge_attr = torch.tensor(edge_weights, dtype=torch.float)

    return Data(x=x, edge_index=edge_index, edge_attr=edge_attr)

# Generate data
grocery_stores = generate_grocery_stores(NUM_GROCERY_STORES)
food_banks = generate_food_banks(NUM_FOOD_BANKS)
data = create_data(grocery_stores, food_banks)

import torch.nn.functional as F
from torch_geometric.nn import GCNConv

class FoodBankGNN(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.conv1 = GCNConv(input_dim, hidden_dim)
        self.conv2 = GCNConv(hidden_dim, hidden_dim)
        self.edge_mlp = torch.nn.Sequential(
            torch.nn.Linear(2 * hidden_dim, hidden_dim),
            torch.nn.ReLU(),
            torch.nn.Linear(hidden_dim, 1)
        )

    def forward(self, data):
        x, edge_index = data.x, data.edge_index
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.conv2(x, edge_index)
        x = F.relu(x)

        # Predict edge scores
        row, col = edge_index
        edge_features = torch.cat([x[row], x[col]], dim=1)
        edge_scores = self.edge_mlp(edge_features).squeeze()
        return edge_scores
    


from torch_geometric.loader import DataLoader

# Training function
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
        print(f"Epoch {epoch} Loss: {total_loss / len(loader)}")

# Test function
def test(model, loader, criterion):
    model.eval()
    total_loss = 0
    with torch.no_grad():
        for data in loader:
            output = model(data)
            loss = criterion(output, data.edge_attr.squeeze())
            total_loss += loss.item()
    print(f"Test Loss: {total_loss / len(loader)}")

# Create DataLoader
loader = DataLoader([data], batch_size=1, shuffle=True)

# Initialize model, optimizer, and loss
model = FoodBankGNN(input_dim=5, hidden_dim=64, output_dim=32)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = torch.nn.MSELoss()

# Train and test
train(model, loader, optimizer, criterion, epochs=150)
test(model, loader, criterion)


model.eval()
with torch.no_grad():
    predictions = model(data).numpy()
    true_values = data.edge_attr.squeeze().numpy()

# Scatter plot
import matplotlib.pyplot as plt
plt.scatter(true_values, predictions)
plt.xlabel("True Edge Weights")
plt.ylabel("Predicted Edge Weights")
plt.show()