import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addItemToCart, removeFromCart, removeItemFromCart } from '../../features/cart/cartSlice';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../graphql/queries/products';
import { AddToBasket } from '../AddToBasket';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface IBasketItem {
  id: string;
  counter: number;
  onLoading: (loading: boolean) => void;
}

/**
 * Карточка товара из корзины
 *
 * В компоненте присутсвтует паттерн "Render prop"
 */

export const BasketItem: React.FC<IBasketItem> = ({ id, counter, onLoading }) => {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { getOneId: id },
  });

  const prevLoadingRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (prevLoadingRef.current !== loading) {
      onLoading(loading);
      prevLoadingRef.current = loading;
    }
  }, [loading, onLoading]);

  if (loading) return null;

  if (error) return <p>Ошибка загрузки товара</p>;

  const product = data.products.getOne;
  const price = product.price * counter;

  const removeFromCartHandler = () => dispatch(removeFromCart(id));
  const addItemToCartHandler = () => dispatch(addItemToCart({ id }));
  const removeItemFromCartHandler = () => dispatch(removeItemFromCart(id));

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
      <CardMedia
        component="img"
        image={product.photo}
        alt={product.name}
        sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography fontWeight={600}>{product.name}</Typography>
        <Typography>{price}.00&nbsp;₽</Typography>
        <Box width={150}>
          <AddToBasket counter={counter} increaseClick={addItemToCartHandler} decreaseClick={removeItemFromCartHandler} />
        </Box>
      </CardContent>
      <IconButton onClick={removeFromCartHandler}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};
