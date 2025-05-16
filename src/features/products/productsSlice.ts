import { createSlice } from '@reduxjs/toolkit';
import createRandomProductImage from '../createRandomProductImage';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  details: string;
}

const initialState: Product[] = [
  {
    id: '1',
    title: 'Рубашка',
    details: 'Рубашка с принтом',
    price: 1200,
    image: createRandomProductImage(3),
    category: 'Футболки, рубашки',
  },
  {
    id: '2',
    title: 'Кардиган',
    details: 'Вязаный кардиган',
    price: 2800,
    image: createRandomProductImage(1),
    category: 'Футболки, рубашки',
  },
  {
    id: '3',
    title: 'Джемпер',
    details: 'Крупная вязка',
    price: 1700,
    image: createRandomProductImage(2),
    category: 'Футболки, рубашки',
  },
  {
    id: '4',
    title: 'Жилетка',
    details: 'Базовая жилетка',
    price: 2100,
    image: createRandomProductImage(4),
    category: 'Футболки, рубашки',
  },
];

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
    addRandomProducts(state, action: { payload: Product[] }) {
      state.push(...action.payload);
    },
  },
});

export const { addProduct, editProduct, removeProduct, addRandomProducts } = productsSlice.actions;
export default productsSlice.reducer;
