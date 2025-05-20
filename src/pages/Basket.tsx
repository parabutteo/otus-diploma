import * as React from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  Paper,
  Link as MuiLink,
} from '@mui/material';
import { useAppSelector } from '../features/store/hooks';
import { clearCart } from '../entities/cart/cartSlice';
import { BasketItem, Layout, Loader } from '../components';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../graphql/mutations/products';
import { backendErrorMessages } from '../features/constants';

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

  // Функция для локализации ошибок
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessage = (error: any) => {
    if (error?.graphQLErrors) {
      for (const e of error.graphQLErrors) {
        if (e.extensions?.code === 'AUTH') return backendErrorMessages.AUTH;
      }
    }
    return error?.message || t('basket.unknownError');
  };

  return (
    <Layout title={t('basket.title')}>
      <Stack spacing={3} alignItems="center">
        {data && (
          <Paper elevation={2} sx={{ p: 3, width: '100%', maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              {t('basket.orderSuccess')}
            </Typography>
            <Typography>
              {t('basket.orderId')}: <strong>{data.orders.add.id}</strong>
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <MuiLink component={Link} to="/profile/orders" underline="hover">
                {t('basket.goToOrders')}
              </MuiLink>
            </Typography>
          </Paper>
        )}

        {emptyBasket && (
          <Box textAlign="center" py={6}>
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
          </Box>
        )}

        {loadingCount > 0 && <Loader />}

        <Stack spacing={2} width="100%">
          {cartItems.map((item) => (
            <BasketItem key={item.id} id={item.id} counter={item.quantity} onLoading={onItemLoading} />
          ))}
        </Stack>

        {error && (
          <Paper
            elevation={1}
            sx={{ p: 2, backgroundColor: 'error.light', color: 'error.contrastText' }}
          >
            <Typography>
              {t('basket.orderError')}: {getErrorMessage(error)}
            </Typography>
          </Paper>
        )}

        {!emptyBasket && (
          <Button
            variant="contained"
            onClick={handleAddOrder}
            disabled={loading}
            size="large"
            sx={{ mt: 3 }}
          >
            {t('basket.placeOrder')}
          </Button>
        )}
      </Stack>
    </Layout>
  );
};
