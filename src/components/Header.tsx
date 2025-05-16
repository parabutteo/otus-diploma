// src/components/Header.tsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TranslateIcon from "@mui/icons-material/Translate";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { visuallyHidden } from "@mui/utils";
import { useAppSelector, useAppDispatch } from "../store/hooks.ts";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../app/ThemeContext.tsx";
import { logout } from "../features/auth/authSlice.ts";
import { clearCart } from "../features/cart/cartSlice.ts";


export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const isUserLoggedIn = token !== null;
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsCounter = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const loginHandler = (): void => {
    if (isUserLoggedIn) {
      dispatch(logout());
      dispatch(clearCart());
      localStorage.removeItem('cart');
    } else navigate('/auth');
  };

  const { mode, toggleTheme } = React.useContext(ThemeContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangSelect = (lang: "ru" | "en") => {
    i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <StoreIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Otus Online Store
        </Typography>

        <IconButton color="inherit">
          <Badge badgeContent={cartItemsCounter} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Переключение темы */}
        <IconButton color="inherit" onClick={toggleTheme} aria-label="Toggle theme">
          {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        {/* Переключение языка */}
        <IconButton color="inherit" onClick={handleLangClick}>
          <TranslateIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => handleLangSelect("ru")}>{t("ru")}</MenuItem>
          <MenuItem onClick={() => handleLangSelect("en")}>{t("en")}</MenuItem>
        </Menu>

        {/* Вход / Выход */}
        <IconButton
          color="inherit"
          onClick={loginHandler}
          aria-label={t(isUserLoggedIn ? "logout" : "login")}
        >
          {isUserLoggedIn ? <LogoutIcon /> : <PersonIcon />}
          <span style={visuallyHidden}>{t(isUserLoggedIn ? "logout" : "login")}</span>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};