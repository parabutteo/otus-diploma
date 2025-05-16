import { createTheme, type PaletteMode } from "@mui/material";
import "./theme.ts";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
        contrastText: "#fff",
      },
      custom: {
        titleBg: mode === "dark" ? "#1565c0" : "#e3f2fd",
        titleColor: mode === "dark" ? "#ffffff" : "#000000",
      },
    },
  });
