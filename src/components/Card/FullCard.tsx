import React from 'react';
import { addItemToCart, removeItemFromCart } from '../../entities/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../features/store/hooks';
import { AddToBasket } from '../AddToBasket';
import { Box, Typography, Paper } from '@mui/material';

export interface IFullCard {
  id: string;
  /** Заголовок */
  title: string;
  /** Категория */
  category: string;
  /** Описание */
  details: string;
  /** Цена */
  price: number;
  /** Изображение */
  image: string;
}

/**
 * Детальная карточка товара
 */
export const FullCard: React.FC<IFullCard> = ({ id, title, price, details, image }) => {
  const dispatch = useAppDispatch();

  const removeItemFromCartHandler = () => dispatch(removeItemFromCart(id));
  const addItemToCartHandler = () => dispatch(addItemToCart({ id }));

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, items) => (id === items.id ? acc + items.quantity : acc), 0);

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 3,
        p: 3,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flexShrink: 0, width: { xs: '100%', sm: 600 }, minHeight: { xs: 'auto', sm: 600 }  }}>
        <img src={image} alt={title} width="100%" style={{ borderRadius: 8, objectFit: 'cover' }} />
      </Box>

      <Box sx={{ flexGrow: 1}}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {details}
        </Typography>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          {price}.00 ₽
        </Typography>

        <Box width={totalQuantity > 0 ? 150 : 300}>
          <AddToBasket
            counter={totalQuantity}
            increaseClick={addItemToCartHandler}
            decreaseClick={removeItemFromCartHandler}
          />
        </Box>
      </Box>
    </Paper>
  );
};
