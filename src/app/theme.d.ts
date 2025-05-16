import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      titleBg: string;
      titleColor: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      titleBg?: string;
      titleColor?: string;
    };
  }
}
