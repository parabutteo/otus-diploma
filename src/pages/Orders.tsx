import React from 'react';
import { Layout, Loader } from '../components';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries/products';
import { REMOVE_ORDER } from '../graphql/mutations/products';
import { Button, Box, Typography, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { GET_PROFILE_ID } from '../graphql/queries/profile';

export const Orders: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const input = {};

  // Запрос списка заказов
  const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
    variables: { input },
  });

  // Мутация удаления заказа
  const [removeOrder, { loading: removing }] = useMutation(REMOVE_ORDER, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      alert(`${t('orders.cancelError')} ${error.message}`);
    },
  });

  // Запрос profileId текущего пользователя
  const { data: pidData } = useQuery(GET_PROFILE_ID);
  const profileId = pidData?.profile?.id || null;

  // Получаем список заказов
  const ordersList = data?.orders.getMany.data || [];

  // Фильтруем заказы по profileId (order.user.id)
  const filteredOrders = profileId ? ordersList.filter((order: any) => order.user?.id === profileId) : [];

  // Обработчик удаления заказа
  const handleRemoveOrder = (orderId: string) => {
    if (window.confirm(`${t('orders.confirmCancel')}`)) {
      removeOrder({
        variables: { removeId: orderId },
      });
    }
  };

  return (
    <Layout title="Мои заказы">
      {(loading || removing) && <Loader />}
      {error && (
        <Typography color="error">
          {t('orders.error')}: {error?.message}
        </Typography>
      )}
      {!loading && !error && (
        <>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order: any) => (
              <Box
                key={order.id}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 3,
                  mb: 4,
                }}
              >
                <Typography variant="h6">ID: {order.id}</Typography>
                <Typography variant="h6">
                  Заказ в статусе:
                  {order.status && ' ожидает подтверждения'}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {t('orders.itemsCount')}: {order.products.length}
                </Typography>
                <List dense>
                  {order.products.map((product: any) => (
                    <ListItem key={product.product.id} disableGutters>
                      <Typography fontWeight={600}>{product.product.name}</Typography>
                      <Typography>
                        , {product.quantity} {t('orders.pcs')}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => handleRemoveOrder(order.id)}
                  disabled={removing}
                >
                  {t('orders.cancel')}
                </Button>
              </Box>
            ))
          ) : (
            <Box sx={{ mt: 4 }}>
              <Box textAlign="center" py={6}>
                <ShoppingCartIcon sx={{ fontSize: 100, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {t('orders.emptyTitle')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  {t('orders.emptyMessage')}
                </Typography>
                <Button variant="contained" onClick={() => navigate('/')}>
                  {t('orders.toCatalog')}
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
    </Layout>
  );
};
