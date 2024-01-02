import { useContext, useEffect, useState } from "react";
import { dataURL } from "../../../constants";
import searchContext from "../searchContext";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const { search } = useContext(searchContext);

  async function fetchData() {
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

    setData(restaurants);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.map((restaurantGroup) => {
    if (restaurantGroup) {
      return restaurantGroup?.filter((restaurant) => {
        if (restaurant.info.name.toLowerCase().includes(search)) {
          return restaurant;
        }
      });
    }
  });

  if (filteredData) return filteredData;

  return data;
};

export default useFetchData;
