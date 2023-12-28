import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/NavbarComponent";
import CardComponent from "./components/card";
import { dataURL } from "../constants";

async function fetchData(setRestaurants) {
  const data = await fetch(dataURL);
  const json = await data.json();
  let restaurants = [];

  json?.data?.cards?.forEach((card) => {
    if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
      restaurants.push(
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    }
  });

  setRestaurants(restaurants);
}

const ProductListComponent = ({ filterByName, Restaurants }) => {
  const search = filterByName.toLowerCase();

  return (
    <div className="product-list container">
      {Restaurants.map((restaurantGroup) =>
        restaurantGroup
          .filter((restaurant) => {
            if (restaurant.info.name.toLowerCase().includes(search)) {
              return restaurant;
            }
          })
          .map((restaurant) => {
            return (
              <div key={restaurant?.info?.id}>
                <CardComponent restaurant={restaurant} />
              </div>
            );
          })
      )}
    </div>
  );
};

const MainComponent = () => {
  const [searchText, setSearchValue] = useState("");
  const [Restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchData(setRestaurants);
  }, []);

  return (
    <>
      <Navbar searchText={searchText} setSearchValue={setSearchValue} />
      <ProductListComponent
        filterByName={searchText}
        Restaurants={Restaurants}
      />
    </>
  );
};

root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainComponent />);
