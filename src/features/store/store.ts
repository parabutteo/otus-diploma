import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../entities/auth/authSlice';
import appReducer from '../../entities/app/appSlice';
import cartReducer from '../../entities/cart/cartSlice';
import productsReducer from '../products/productsSlice';

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
