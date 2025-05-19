import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  profileId: string;
  token: string | null;
}

const initialState: AuthState = {
  profileId: localStorage.getItem('pid') || '',
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setProfileID(state, action: PayloadAction<string>) {
      state.profileId = action.payload;
      localStorage.setItem('pid', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.profileId = '';
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, setProfileID, logout } = authSlice.actions;
export default authSlice.reducer;
