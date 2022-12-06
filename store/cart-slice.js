import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingCartItem = state.cartItems.find(
        (item) => item.product.slug === action.payload.product.slug
      );

      if (existingCartItem) {
        if (
          existingCartItem.product.countInStock === existingCartItem.quantity
        ) {
          alert('Oop!! Out of Stock!');
        } else {
          existingCartItem.quantity++;
        }
      } else {
        state.cartItems.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
