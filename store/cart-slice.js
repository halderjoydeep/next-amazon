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
        } else if (action.payload.quantity === 1) {
          alert('Item already added to cart');
        } else {
          existingCartItem.quantity = action.payload.quantity;
        }
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const existingCartItem = state.cartItems.find(
        (item) => item.product.slug === action.payload
      );
      if (existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.product.slug !== action.payload
        );
      } else {
        existingCartItem.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
