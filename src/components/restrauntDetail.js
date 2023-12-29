import { useState, useEffect } from "react";
import { imageURL, restaurantDataURL } from "../../constants";
import { useParams } from "react-router-dom";

const RestaurantDetailComponent = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);

  async function FetchMenu() {
    const data = await fetch(restaurantDataURL + id);
    const json = await data.json();

    let tempMenu = {};

    tempMenu.items = json?.data?.cards
      .map((card) => card.groupedCard?.cardGroupMap?.REGULAR?.cards)
      .find((dataExists) => dataExists != undefined)
      .map((card) => card?.card?.card?.itemCards)
      .find((dataExists) => dataExists != undefined)
      .map((card) => card?.card?.info?.name);

    tempMenu.info = json?.data?.cards
      .map((card) => card?.card?.card?.info)
      .find((dataExists) => dataExists != undefined);

    setMenu(tempMenu);
  }

  useEffect(() => {
    FetchMenu();
  }, []);

  if (menu) {
    return (
      <div className="menu container">
        <div className="left">
          {menu.info.logo ? <img src={imageURL + menu.info.logo} /> : null}
          <h1>{menu.info.name}</h1>
          <h3>{menu.info.city}</h3>
          <p>{menu.info.avgRating}</p>
          <p>{menu.info.costForTwoMessage}</p>
          <img src={imageURL + menu.info.cloudinaryImageId} />
        </div>
        <div className="right">
          {menu.items
            ? menu.items.map((item) => <li key={item}>{item}</li>)
            : null}
        </div>
      </div>
    );
  }
};

export default RestaurantDetailComponent;
