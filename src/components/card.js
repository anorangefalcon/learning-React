import { imageURL } from "../../constants";

const CardComponent = ({ restaurant }) => {
  const { name, avgRating, cloudinaryImageId } = restaurant.info;

  return (
    <div className="card pointer">
      <div className="card-header">
        <img
          className="image"
          src={imageURL + cloudinaryImageId}
          alt="restaurant image"
        />
      </div>
      <p className="name">{name}</p>
      <p className="price">{avgRating}</p>
    </div>
  );
};

export default CardComponent;
