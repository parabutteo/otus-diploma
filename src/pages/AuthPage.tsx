import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LangAndHomeControls } from "../components";

export const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // обработка логина
    console.log("Login with:", login, password);
  };

  const handleRegister = () => {
    navigate("/reg")
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={2}
    >
      <Box maxWidth={600} width="100%">
        <LangAndHomeControls />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t("auth.title")}
        </Typography>

        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Stack spacing={2}>
            <TextField
              label={t("auth.login")}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder={t("auth.loginPlaceholder")}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={t("auth.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              type="password"
              fullWidth
              variant="outlined"
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                {t("auth.loginBtn")}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleRegister}>
                {t("auth.registerBtn")}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};
