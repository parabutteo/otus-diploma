import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  profile: {
    id: string;
    name: string;
    email: string;
    aboutMe: string;
  } | null;
}

const loadProfileFromStorage = () => {
  const storedProfile = localStorage.getItem('profile');
  return storedProfile ? JSON.parse(storedProfile) : null;
};

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  profile: loadProfileFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      const profile = {
        id: 'user1',
        name: 'Фродо Бэггинс',
        email: 'mail@mail.ru',
        aboutMe: 'Вот что я скажу о себе:',
      };
      state.profile = profile;
      localStorage.setItem('profile', JSON.stringify(profile));
    },
    updateProfile(state, action: PayloadAction<AuthState['profile']>) {
      state.profile = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;
