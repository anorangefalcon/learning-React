import { imageURL } from "../../constants";
import { Link } from "react-router-dom";

const CardComponent = ({ restaurant }) => {
  const { name, avgRating, cloudinaryImageId, id } = restaurant.info;

  return (
    <Link to={"/restraunt/" + id} className="card pointer">
      <div className="card-header">
        <img
          className="image"
          src={imageURL + cloudinaryImageId}
          alt="restaurant image"
        />
      </div>
      <p className="name">{name}</p>
      <p className="price">{avgRating}</p>
    </Link>
  );
};

export default CardComponent;
