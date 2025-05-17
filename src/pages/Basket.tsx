import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addItemToCart,
  removeItemFromCart,
  removeFromCart,
} from "../features/cart/cartSlice";
import { Layout } from "../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Basket: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const fullItems = cartItems
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return product
        ? {
            ...product,
            quantity: cartItem.quantity,
          }
        : null;
    })
    .filter(Boolean);

  const removeFromCartHandler = (id: string) => dispatch(removeFromCart(id));
  const addItemToCartHandler = (id: string) => dispatch(addItemToCart({ id }));
  const removeItemFromCartHandler = (id: string) => dispatch(removeItemFromCart(id));

  return (
    <Layout title={t("basket.title")}>
      {fullItems.length === 0 ? (
        <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
          <ShoppingCartIcon sx={{ fontSize: 100, color: "primary.main", mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {t("basket.emptyTitle")}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t("basket.emptyMessage")}
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            {t("basket.toCatalog")}
          </Button>
        </Container>
      ) : (
        <Stack spacing={2}>
          {fullItems.map((item) => {
            const id = item!.id;

            return (
              <Card key={id} sx={{ display: "flex", alignItems: "center", px: 2 }}>
                <CardMedia
                  component="img"
                  image={item!.image}
                  alt={item!.title}
                  sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 1 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography fontWeight={600}>{item!.title}</Typography>
                  <Typography>
                    {(item!.price * item!.quantity).toFixed(2)} ₽
                  </Typography>
                </CardContent>

                <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={2}>
                  <Button
                    onClick={() => removeItemFromCartHandler(id)}
                    sx={{ minWidth: 40, color: "error.main" }}
                  >
                    –
                  </Button>
                  <Box px={2}>{item!.quantity}</Box>
                  <Button
                    onClick={() => addItemToCartHandler(id)}
                    sx={{ minWidth: 40, color: "primary.main" }}
                  >
                    +
                  </Button>
                </Box>

                <IconButton onClick={() => removeFromCartHandler(id)}>
                  <DeleteIcon />
                </IconButton>
              </Card>
            );
          })}
        </Stack>
      )}
    </Layout>
  );
};
