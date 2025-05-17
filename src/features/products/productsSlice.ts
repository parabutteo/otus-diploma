import { createSlice } from '@reduxjs/toolkit';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  details: string;
}

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: { payload: Product }) {
      state.push(action.payload);
    },
    editProduct(state, action: { payload: Product }) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeProduct(state, action: { payload: string }) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addProduct, editProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
