import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./app/i18n"; // i18n init
import { CssBaseline } from "@mui/material";
import {CustomThemeProvider} from "./app/ThemeContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline />
        <App />
      </CustomThemeProvider>
    </Provider>
  </StrictMode>,
)
