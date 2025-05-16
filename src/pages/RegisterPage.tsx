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

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = () => {
    // обработка регистрации
    console.log("Register with:", login, password);
  };

  const handleBack = () => {
    navigate("/auth");
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
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t("reg.title")}
        </Typography>

        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Stack spacing={2}>
            <TextField
              label={t("reg.login")}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder={t("reg.loginPlaceholder")}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={t("reg.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("reg.passwordPlaceholder")}
              type="password"
              fullWidth
              variant="outlined"
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleRegister}>
                {t("reg.registerBtn")}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleBack}>
                {t("reg.backBtn")}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};
