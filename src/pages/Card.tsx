import React from 'react';
import { useParams } from 'react-router-dom';
import { FullCard, Layout, Loader } from '../components';
import { GET_PRODUCT } from '../graphql/queries/products';
import { useQuery } from '@apollo/client';

export const Card: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { getOneId: id },
    skip: !id,
  });

  // Минимальное время загрузки
  const MIN_LOADING_TIME = 1000;
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowContent(true), MIN_LOADING_TIME);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [loading]);

  const product = data?.products.getOne;

  return (
    <Layout title={product?.category.name}>
      {error && <div>Ошибка: {error.message}</div>}
      {(loading || !showContent) && <Loader />}
      {!loading && showContent && product && (
        <FullCard
          id={id || '0'}
          title={product.name}
          price={product.price}
          details={product.desc}
          category={product.category?.name}
          image={product.photo || []}
        />
      )}
      {!loading && showContent && !product && <div>Товар не найден</div>}
    </Layout>
  );
};
