import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import './app/i18n'; // i18n init
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from './app/ThemeContext.tsx';
import store from './features/store/store.ts';
import { Client as ApolloClient } from './client/ApolloClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloClient>
      <Provider store={store}>
        <CustomThemeProvider>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CustomThemeProvider>
      </Provider>
    </ApolloClient>
  </StrictMode>,
);
