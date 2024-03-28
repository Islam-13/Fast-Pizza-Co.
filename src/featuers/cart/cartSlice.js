import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "Mediterranean",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload = new item
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      // payload = pizza id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      // payload = pizza id
      const item = state.cart.find((i) => i.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity: (state, action) => {
      // payload = pizza id
      const item = state.cart.find((i) => i.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((curr, acc) => curr + acc.totalPrice, 0);

export const getTotalCartItems = (state) =>
  state.cart.cart.reduce((curr, acc) => curr + acc.quantity, 0);

export const getItemQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;

// reselect library
