import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

// configuring our redux store:
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
