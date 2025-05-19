import * as React from "react";
import { Header } from "./Header.tsx";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { Footer } from "./Footer.tsx";
import { ScrollTopFab } from "./ScrollTopFab.tsx";

interface Props {
  title: string;
  children: React.ReactNode | string;
}

export const Layout: React.FC<Props> = ({title, children}) => {
  const theme = useTheme();
  const titleBg = theme.palette.custom.titleBg;
  const titleColor = theme.palette.custom.titleColor;
  

  return(
    <Box display="flex" flexDirection="column" minHeight="100vh" justifyContent="space-between">
      <Box>
        <Header />
        {/* Блок с заголовком */}
        <Box height={90} sx={{ width: "100%", bgcolor: titleBg, py: 3 }}>
          <Container maxWidth="xl">
            <Typography variant="h4" component="h1" sx={{ color: titleColor }}>
              {title}
            </Typography>
          </Container>
        </Box>

        {/* Основной контент */}
        <Box sx={{ py: 4 }}>
          <Container maxWidth="xl">{children}</Container>
        </Box>

      </Box>

      {/* Прокрутка наверх */}
      <ScrollTopFab />

      {/* Подвал */}
      <Footer />
    </Box>
)};