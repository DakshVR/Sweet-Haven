import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    reduceStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const productIndex = state.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        state[productIndex].inStock -= quantity;
      }
    },
    increaseStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const productIndex = state.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        state[productIndex].inStock += quantity;
      }
    },
  },
});

export const { setProducts, reduceStock, increaseStock } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/products.json");
    const products = await response.json();
    dispatch(setProducts(products));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default productSlice.reducer;
