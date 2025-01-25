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
            torch.nn.Linear(2 * hidden, hidden),
            torch.nn.ReLU(),
            torch.nn.Linear(hidden, hidden)
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


    