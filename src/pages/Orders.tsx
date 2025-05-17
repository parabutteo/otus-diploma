import React from 'react';
import { Layout, Loader } from '../components';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries/products';
import { REMOVE_ORDER } from '../graphql/mutations/products';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const Orders: React.FC = () => {
  const input = {};

  const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
    variables: { input },
  });

  const [removeOrder, { loading: removing }] = useMutation(REMOVE_ORDER, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      alert(`Ошибка при удалении заказа: ${error.message}`);
    },
  });

  const ordersList = data?.orders.getMany.data;

  const handleRemoveOrder = (orderId: string) => {
    if (window.confirm('Вы уверены, что хотите отказаться от этого заказа?')) {
      removeOrder({
        variables: { removeId: orderId },
      });
    }
  };

  return (
    <Layout title="Мои заказы">
      {(loading || removing) && <Loader />}
      {error && <p>Ошибка: {error.message}</p>}
      {!loading && !error && (
        <>
          {ordersList && ordersList.length > 0 ? (
            ordersList.map((order: any) => (
              <div key={order.id} className="box margin-bottom-32">
                <h3>ID: {order.id}</h3>
                <p className="margin-top-8">Заказано позиций: {order.products.length}</p>
                <ul>
                  {order.products.map((product: any) => (
                    <li key={product.product.id}>
                      <span className="txt-bold">{product.product.name}</span>, {product.quantity} шт.
                    </li>
                  ))}
                </ul>
                <Button className="small" onClick={() => handleRemoveOrder(order.id)} disabled={removing}>
                  Отказаться от заказа
                </Button>
              </div>
            ))
          ) : (
            <>
              <p className="margin-top-32">Заказы не найдены.</p>
              <p className="margin-top-8">
                Вы можете вернуться на <Link to="/">главную</Link>.
              </p>
            </>
          )}
        </>
      )}
    </Layout>
  );
};
