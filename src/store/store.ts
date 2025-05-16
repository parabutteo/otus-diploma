import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import appReducer from '../features/app/appSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
