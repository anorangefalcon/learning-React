import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../utils/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const removeItemFromCart = (item) => {
    dispatch(removeItem(item));
  };

  const clearAllItemsFromCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container cart">
      <button
        className="our-btn"
        onClick={() => {
          clearAllItemsFromCart();
        }}
      >
        Clear Cart
      </button>
      <ol>
        {cartItems.map((item) => (
          <div key={item} className="removeItem container">
            <li>
              {item} <button onClick={() => removeItemFromCart(item)}>x</button>
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default Cart;
