import * as React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "../components";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout title={"404"}>
        <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {t("notFound.title")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {t("notFound.description")}
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
                {t("notFound.button")}
            </Button>
        </Container>
    </Layout>
  );
};
