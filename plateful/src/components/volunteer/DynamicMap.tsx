import React from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";

type Coordinate = [number, number];

interface FoodBank {
  coords: Coordinate;
  weight: number;
}

interface GroceryStore {
  coords: Coordinate;
}

interface DynamicMapProps {
  groceryStore: GroceryStore;
  foodBanks: FoodBank[];
}

// Helper function to determine pin color based on weight
const getPinColor = (weight: number) => {
  if (weight >= 0.75) return "green";
  if (weight >= 0.5) return "yellow";
  return "red";
};

const groceryStoreIcon = L.icon({
  iconUrl: "/images/grocery-store-icon.png", // Update with correct path
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const DynamicMap: React.FC<DynamicMapProps> = ({ groceryStore, foodBanks }) => {
  return (
    <MapContainer center={groceryStore.coords} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={groceryStore.coords} icon={groceryStoreIcon} />
      {foodBanks.map((foodBank, index) => (
        <Circle
          key={index}
          center={foodBank.coords}
          radius={200}
          pathOptions={{ color: getPinColor(foodBank.weight) }}
        />
      ))}
    </MapContainer>
  );
};

export default DynamicMap;
