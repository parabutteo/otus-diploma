import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import appReducer from '../features/app/appSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import { rtk_signup } from '../shared/api/auth/rtk_signup';

const store = configureStore({
  reducer: {
    [rtk_signup.reducerPath]: rtk_signup.reducer,
    auth: authReducer,
    app: appReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtk_signup.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
