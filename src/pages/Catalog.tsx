import * as React from "react";
import { Box, Button, Container } from "@mui/material";
import { Layout } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createRandomProduct } from "../features/createRandomProduct";
import { addRandomProducts } from "../features/products/productsSlice";
import { ShortCard } from "../components/Card/ShortCard";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

export const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { t } = useTranslation();

  const showMoreBtnHandler = (): void => {
    const newProducts = Array.from({ length: 4 }, (_, index) =>
      createRandomProduct(products.length + 1 + index)
    );
    dispatch(addRandomProducts(newProducts));
  };

  return (
    <Layout title={t("catalogue.title")}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid key={item.id}>
              <ShortCard item={item} />
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={4}>
          <Button variant="outlined" onClick={showMoreBtnHandler}>
            {t("catalogue.showMore")}
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};
