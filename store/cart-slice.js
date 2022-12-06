import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, product) => {
      const existingProduct = state.items.find(
        (item) => item.slug === product.slug
      );

      if (existingProduct) {
        existingProduct.count++;
      } else {
        state.items.push(product);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
