import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import CardComponent from "./components/Card";
import About from "./components/about";
import Error404Page from "./components/Error404Page";
import Footer from "./components/Footer";
import { dataURL } from "../constants";
import RestaurantDetail from "./components/restrauntDetail";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

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
    <ProductListComponent filterByName={searchText} Restaurants={Restaurants} />
  );
};

const Layout = () => {
  return (
    <>
      {/* <Navbar searchText={searchText} setSearchValue={setSearchValue} /> */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "/",
        element: <MainComponent />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "restraunt/:id",
        element: <RestaurantDetail />,
      },
    ],
  },
]);

root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
// root.render(<MainComponent />);
