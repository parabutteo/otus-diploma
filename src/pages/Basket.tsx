import * as React from 'react';
import { Typography, Button, Stack } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { clearCart } from '../features/cart/cartSlice';
import { BasketItem, Layout, Loader } from '../components';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../graphql/mutations/products';

export const Basket: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [loadingCount, setLoadingCount] = React.useState(0);

  const onItemLoading = (isLoading: boolean) => {
    setLoadingCount((count) => count + (isLoading ? 1 : -1));
  };

  const [addOrder, { data, loading, error }] = useMutation(ADD_ORDER);

  const orderInput = {
    products: cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
  };

  const handleAddOrder = () => {
    addOrder({ variables: { input: orderInput } })
      .then((response) => {
        console.log('Order ID:', response.data.orders.add.id);
        dispatch(clearCart());
      })
      .catch((error) => console.error(error));
  };

  const emptyBasket = cartItems.length === 0;

  return (
    <Layout title={t('basket.title')}>
      <Stack spacing={2}>
        {data && (
          <>
            <p>Заказ успешно оформлен! ID: {data.orders.add.id}</p>
            <p className="margin-top-8">
              Перейти к разделу <Link to="/profile/orders">Мои заказы</Link>
            </p>
          </>
        )}

        {emptyBasket && (
          <>
            <ShoppingCartIcon sx={{ fontSize: 100, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {t('basket.emptyTitle')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {t('basket.emptyMessage')}
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              {t('basket.toCatalog')}
            </Button>
          </>
        )}

        {loadingCount > 0 && <Loader />}

        {cartItems.map((item) => (
          <BasketItem key={item.id} id={item.id} counter={item.quantity} onLoading={onItemLoading} />
        ))}

        {error && <p className="error margin-bottom-24 margin-top-16">Ошибка при оформлении заказа: {error.message}</p>}

        {!emptyBasket && (
          <Button variant="contained" onClick={handleAddOrder} disabled={loading}>
            Оформить заказ
          </Button>
        )}
      </Stack>
    </Layout>
  );
};
