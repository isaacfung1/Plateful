import Papa from "papaparse";

interface FoodBank {
  coords: [number, number];
  weight: number;
}

interface GroceryStore {
  coords: [number, number];
}

interface ParsedData {
  groceryStore: GroceryStore;
  foodBanks: FoodBank[];
}

export const parseCSV = (csvData: string): ParsedData => {
  const parsed = Papa.parse(csvData, { header: true });
  const data = parsed.data as any[];

  const groceryStore: GroceryStore = {
    coords: [parseFloat(data[0].Store_Location_X), parseFloat(data[0].Store_Location_Y)],
  };

  const foodBanks: FoodBank[] = data.slice(0, 10).map((row) => ({
    coords: [parseFloat(row.Bank_Location_X), parseFloat(row.Bank_Location_Y)],
    weight: parseFloat(row.Predicted_Weight),
  }));

  return { groceryStore, foodBanks };
};