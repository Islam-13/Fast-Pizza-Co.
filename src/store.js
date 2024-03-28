import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./featuers/user/userSlice";
import cartSlice from "./featuers/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
