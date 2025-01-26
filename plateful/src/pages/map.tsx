import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import DynamicMap from "../components/volunteer/DynamicMap";
import Papa from "papaparse";
import { init } from "next/dist/compiled/webpack/webpack";

interface FoodBank {
  coords: [number, number];
  weight: number;
}

interface GroceryStore {
  coords: [number, number];
}

const MapPage = () => {
  const initialCenter: [number, number] = [44.23, -76.5]; // Set to Kingston Ontario
  const relativeCenter: [number, number] = [44.2312, -76.4860]; // Coordinates used to simulate foodbanks around Kingston 
  const [groceryStore, setGroceryStore] = useState<GroceryStore>({ coords: initialCenter });
  const [foodBanks, setFoodBanks] = useState<FoodBank[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/store_bank_predictions.csv");
      const csvData = await response.text();
      const parsed = Papa.parse(csvData, { header: true });
      const data = parsed.data as any[];

      const groceryStore: GroceryStore = {
        coords: initialCenter,
      };

      const scalingFactor = 0.0002; // used to keep the demo foodbanks within range

      const foodBanks: FoodBank[] = data.slice(0, 7).map((row) => ({
        // Coordinates have calculations to simulate the foodbanks within Kingston region
        coords: [ 
            relativeCenter[0] + (parseFloat(row.Bank_Location_X) - initialCenter[0]) * scalingFactor + 0.005, 
            relativeCenter[1] + (parseFloat(row.Bank_Location_Y) - initialCenter[1]) * scalingFactor - 0.04
        ],
        weight: parseFloat(row.Predicted_Weight),
      }));

      setGroceryStore(groceryStore);
      setFoodBanks(foodBanks);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ height: "500px", width: "100%" }}>
        <DynamicMap groceryStore={groceryStore} foodBanks={foodBanks} initialCenter={initialCenter} />
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;