import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addItemToCart, removeItemFromCart } from "../../features/cart/cartSlice";
import { useTranslation } from "react-i18next";

export interface IShortCardItem {
  /** Идентификатор */
  id: string;
  /** Заголовок */
  title: string;
  /** Описание */
  details: string;
  /** Цена */
  price: number;
  /** Главное изображение */
  image: string;
  /** Категория */
  category: string;
}

export interface IShortCard {
  item: IShortCardItem;
}

export const ShortCard: React.FC<IShortCard> = ({ item }) => {
  const { title, details, price, image } = item;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (acc, i) => (i.id === item.id ? acc + i.quantity : acc),
    0
  );

  const addItemToCartHandler = () => {
    dispatch(addItemToCart({ id: item.id }));
  };

  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
      <CardMedia component="img" height="450" image={image} alt={title} />

      <CardActions sx={{ px: 2, pt: 2, justifyContent: "center" }}>
        {totalQuantity > 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Button
              onClick={() => dispatch(removeItemFromCart(item.id))}
              sx={{ minWidth: 40, borderRadius: 0, color: "error.main" }}
            >
              –
            </Button>
            <Box
              sx={{
                width: 48,
                textAlign: "center",
                px: 1,
                py: 0.5,
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              {totalQuantity}
            </Box>
            <Button
              onClick={() => dispatch(addItemToCart({ id: item.id }))}
              sx={{ minWidth: 40, borderRadius: 0, color: "primary.main" }}
            >
              +
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            fullWidth
            endIcon={<ShoppingCartIcon />}
            onClick={addItemToCartHandler}
          >
            {t("card.addToBasket")}
          </Button>
        )}
      </CardActions>


      <CardContent sx={{ pt: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {details}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {price.toFixed(2)} ₽
        </Typography>
      </CardContent>
    </Card>
  );
};
