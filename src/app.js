import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Navbar, { searchContext } from "./components/Navbar";
import CardComponent from "./components/Card";
import Error404Page from "./components/Error404Page";
import Footer from "./components/Footer";
import { dataURL } from "../constants";
import RestaurantDetail from "./components/restrauntDetail";
import Profile from "./components/Profile";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import useFetchData from "./utils/hooks/useFetchData";
import Accordian from "./components/Accordian";
import searchContext from "./utils/searchContext";
import { Provider } from "react-redux";
import store from "./utils/store";
import CartComponent from "./components/Cart";

// lazy loading/ dynamic bundling etc.
const About = lazy(() => import("./components/about"));

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

const ProductListComponent = ({ Restaurants }) => {
  return (
    <div className="product-list container">
      {Restaurants.map((restaurantGroup) =>
        restaurantGroup
          .filter((restaurant) => {
            return restaurant;
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
  const Restaurants = useFetchData(); // a custom hook!

  return Restaurants.length > 0 ? (
    <>
      <ProductListComponent Restaurants={Restaurants} />
    </>
  ) : (
    <h1 className="container">Loading Bro...</h1>
  );
};

const Layout = () => {
  const [searchState, setSearchState] = useState("");
  // const search = useContext(searchContext);

  return (
    <>
      <Provider store={store}>
        <searchContext.Provider
          value={{
            search: searchState,
            setSearch: setSearchState,
          }}
        >
          <Navbar />
          <Outlet />
          <Footer />
        </searchContext.Provider>
      </Provider>
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
        element: (
          <Suspense // suspense basically waits for the import at lazy to resolve the promise, till it is resolved it loads whatever is present in fallback
            fallback={<h1 className="container">Hehe Still loading</h1>}
          >
            <About />
          </Suspense>
        ),
        children: [
          {
            path: "profile", // you also need outlet in parent for actually make this work!
            element: <Profile />,
          },
        ],
      },
      {
        path: "/accordian",
        element: <Accordian />,
      },
      {
        path: "/cart",
        element: <CartComponent />,
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

/**
 * PROPS DRILLING:
 *
 * - mainComponent contains a prop (state=a)
 *    - child1 is passed a
 *      - child2 is passed a
 *
 *    and so on...
 */
