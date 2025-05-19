import React from 'react';
import { Layout, Loader } from '../components';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries/products';
import { Button, Box, Typography, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getStatusLabel } from '../shared/getStatusLabel';

export const AdminOrders: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_ORDERS, {
    variables: { input: {} },
  });

  const ordersList = data?.orders.getMany.data;

  return (
    <Layout title="Все заказы">
      {loading && <Loader />}
      {error && (
        <Typography color="error">
          {t('orders.error')}: {error.message}
        </Typography>
      )}
      {!loading && !error && (
        <>
          {ordersList && ordersList.length > 0 ? (
            ordersList.map((order: any) => (
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
                <Typography variant="h6">Заказ в статусе: {getStatusLabel(order.status)}</Typography>
                <Typography sx={{ mt: 2 }}>Заказано пользователем: {order.user.name || '-'}</Typography>
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
