import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: {
    id: string;
    quantity: number;
  }[];
}

const saveStateToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (error) {
    console.error('Ошибка сохранения состояния в localStorage:', error);
  }
};

const loadCartStateFromLocalStorage = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (!serializedState) return { items: [] };
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Ошибка загрузки состояния из localStorage:', error);
    return { items: [] };
  }
};

const initialState: CartState = loadCartStateFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<{ id: string }>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: action.payload.id,
          quantity: 1,
        });
      }
      saveStateToLocalStorage(state);
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
      saveStateToLocalStorage(state);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveStateToLocalStorage(state);
    },
    clearCart(state) {
      state.items = [];
      saveStateToLocalStorage(state);
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
