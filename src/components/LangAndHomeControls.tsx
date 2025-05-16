import {
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as React from "react";

export const LangAndHomeControls: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

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
    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1} mb={2}>
      <IconButton color="primary" onClick={() => navigate("/")}>
        <HomeIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleLangClick}>
        <TranslateIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem selected={i18n.language === "ru"} onClick={() => handleLangSelect("ru")}>
          🇷🇺 Русский
        </MenuItem>
        <MenuItem selected={i18n.language === "en"} onClick={() => handleLangSelect("en")}>
          🇬🇧 English
        </MenuItem>
      </Menu>
    </Box>
  );
};
