import { createSlice } from "@reduxjs/toolkit";

// configuring a slice for redux store that will manage data for cart

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  // Reducers are the function that will perform some changes or get data from the store's this slice when a dispatch action is performed.
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item != action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
