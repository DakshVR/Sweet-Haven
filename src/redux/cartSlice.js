import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state[existingIndex].quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    checkout: (state) => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, checkout } = cartSlice.actions;

export default cartSlice.reducer;
