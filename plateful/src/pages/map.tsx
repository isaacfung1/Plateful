import React from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import DynamicMap from "../components/volunteer/DynamicMap";

const groceryStore = {
  coords: [51.505, -0.09] as [number, number],
};

type Coordinate = [number, number];

interface FoodBank {
  coords: Coordinate;
  weight: number;
}

const foodBanks: FoodBank[] = [
  { coords: [51.51, -0.1], weight: 0.9 },
  { coords: [51.52, -0.12], weight: 0.6 },
  { coords: [51.53, -0.08], weight: 0.3 },
];

const MapPage = () => {
  return (
    <div>
      <Header />
      <div style={{ height: "500px", width: "100%" }}>
        <DynamicMap groceryStore={groceryStore} foodBanks={foodBanks} />
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;