import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import App from './app/App.tsx'
import { Provider } from "react-redux";
import "./app/i18n"; // i18n init
import { CssBaseline } from "@mui/material";
import {CustomThemeProvider} from "./app/ThemeContext.tsx";
import store from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline />
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </CustomThemeProvider>
    </Provider>
  </StrictMode>,
)
