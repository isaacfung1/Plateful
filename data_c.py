import numpy as np
import pandas as pd

# Constants for data synthesis
NUM_GROCERY_STORES = 100
NUM_FOOD_BANKS = 50


np.random.seed(42)

def generate_grocery_stores(num_stores):
    stores = []
    for i in range(num_stores):
        store = {
            'Store_ID': f'Store_{i+1}',
            'Excess_Food_Capacity': np.random.randint(0, 500),  # in kilograms
            '%Perishable': np.random.uniform(10, 90),
            '%Non_Perishable': np.random.uniform(10, 90),
            '%Essentials': np.random.uniform(20, 80),
            '%Non_Essentials': np.random.uniform(20, 80),
            'Location_X': np.random.uniform(0, 100),  # x-coordinate
            'Location_Y': np.random.uniform(0, 100),  # y-coordinate
        }
        # Normalize percentages
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
            'Current_Food_Demand': np.random.randint(30, 300),  # in kilograms
            '%Perishable_Demand': np.random.uniform(10, 90),
            '%Non_Perishable_Demand': np.random.uniform(10, 90),
            '%Essentials_Demand': np.random.uniform(20, 80),
            '%Non_Essentials_Demand': np.random.uniform(20, 80),
            'Location_X': np.random.uniform(0, 100),  # x-coordinate
            'Location_Y': np.random.uniform(0, 100),  # y-coordinate
        }
        # Normalize percentages
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
    edge_weight = []
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
