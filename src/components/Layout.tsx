import * as React from "react";
import { Header } from "./Header.tsx";
import { Box, Container, Typography, useTheme } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode | string;
}

export const Layout: React.FC<Props> = ({title, children}) => {
  const theme = useTheme();
  const titleBg = theme.palette.custom.titleBg;
  const titleColor = theme.palette.custom.titleColor;
  

  return(
  <>
    <Header />
    {/* Блок с заголовком */}
      <Box sx={{ width: "100%", bgcolor: titleBg, py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" sx={{ color: titleColor }}>
            {title}
          </Typography>
        </Container>
      </Box>

      {/* Основной контент */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
  </>
)};