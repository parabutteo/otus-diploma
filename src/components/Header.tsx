// src/components/Header.tsx
import React from "react";
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
import { useAppSelector, useAppDispatch } from "../hooks";
import { toggleLogin } from "../features/user/userSlice";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../app/ThemeContext.tsx";


export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const cartCount = useAppSelector((state) => state.cart.itemsCount);

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
          <Badge badgeContent={cartCount} color="error">
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
          onClick={() => dispatch(toggleLogin())}
          aria-label={t(isLoggedIn ? "logout" : "login")}
        >
          {isLoggedIn ? <LogoutIcon /> : <PersonIcon />}
          <span style={visuallyHidden}>{t(isLoggedIn ? "logout" : "login")}</span>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};