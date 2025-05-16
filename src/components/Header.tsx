import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TranslateIcon from "@mui/icons-material/Translate";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
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
  const { mode, toggleTheme } = React.useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const token = useAppSelector((state) => state.auth.token);
  // ВДРУГ БУДЕМ ПОЛУЧАТЬ ЮЗЕРНЕЙМ
  // const username = useAppSelector((state) => state.auth.username); // предполагается, что он есть
  const isUserLoggedIn = token !== null;
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsCounter = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const loginHandler = (): void => {
    if (isUserLoggedIn) {
      dispatch(logout());
      dispatch(clearCart());
      localStorage.removeItem("cart");
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangSelect = (lang: "ru" | "en") => {
    i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        <ListItem component={'button'} onClick={() => navigate("/")}>
          <ListItemText primary={t("home") || "Home"} />
        </ListItem>
        <ListItem component={'button'} onClick={() => navigate("/cart")}>
          <ListItemText primary={t("cart")} />
        </ListItem>
        <ListItem component={'button'} onClick={toggleTheme}>
          <ListItemText primary={mode === "dark" ? "Light mode" : "Dark mode"} />
        </ListItem>
        <ListItem component={'button'} onClick={handleLangClick}>
          <ListItemText primary={t("language") || "Language"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar>
          {isMobile && (
            <>
              <IconButton
                edge="start"
                color="inherit"
                sx={{ mr: 1 }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {drawer}
              </Drawer>
            </>
          )}

          <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => navigate("/")}>
            <StoreIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Otus Online Store
          </Typography>

          {!isMobile && (
            <>
              <IconButton
                color="inherit"
                aria-label={t("cart")}
                onClick={() => navigate("/cart")}
              >
                <Badge badgeContent={cartItemsCounter} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton color="inherit" onClick={toggleTheme} aria-label="Toggle theme">
                {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>

              <IconButton color="inherit" onClick={handleLangClick} aria-label="Language">
                <TranslateIcon />
              </IconButton>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem selected={i18n.language === "ru"} onClick={() => handleLangSelect("ru")}>
                  {t("ru")}
                </MenuItem>
                <MenuItem selected={i18n.language === "en"} onClick={() => handleLangSelect("en")}>
                  {t("en")}
                </MenuItem>
              </Menu>

              <IconButton
                color="inherit"
                onClick={loginHandler}
                aria-label={t(isUserLoggedIn ? "logout" : "login")}
              >
                {isUserLoggedIn ? <LogoutIcon /> : <PersonIcon />}
                <span style={visuallyHidden}>{t(isUserLoggedIn ? "logout" : "login")}</span>
              </IconButton>

              {/* ЕСЛИ БУДЕМ ПОЛУЧАТЬ ЮЗЕРНЕЙМ */}
              {/* {isUserLoggedIn && (
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {username}
                </Typography>
              )} */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
