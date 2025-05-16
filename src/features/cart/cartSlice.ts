import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsCount: 3,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemsCount: (state, action) => {
      state.itemsCount = action.payload;
    },
  },
});

export const { setItemsCount } = cartSlice.actions;
export default cartSlice.reducer;
