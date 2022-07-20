import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import productsReducer, { productsFetch } from './product/productsSlice';
import cartReducer from './cart/cartSlice';
import { startGetAllCategories } from './product/thunks';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsReducer,
    cart: cartReducer
  }
});

store.dispatch(productsFetch());
store.dispatch(startGetAllCategories());