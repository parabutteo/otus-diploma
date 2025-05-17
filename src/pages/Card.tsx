import React from 'react';
import { useParams } from 'react-router-dom';
import { FullCard, Layout, Loader } from '../components';
import { GET_PRODUCT } from '../graphql/queries/products';
import { useQuery } from '@apollo/client';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Card: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { getOneId: id },
    skip: !id,
  });

  // Минимальное время загрузки
  const MIN_LOADING_TIME = 1000;
  const [showContent, setShowContent] = React.useState(false);
  const { t } = useTranslation();

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
      {error && (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography color="error" variant="h6">
            {t('card.error')}: {error.message}
          </Typography>
        </Container>
      )}

      {(loading || !showContent) && <Loader />}

      {!loading && showContent && product && (
        <Box sx={{ py: 4 }}>
          <FullCard
            id={id || '0'}
            title={product.name}
            price={product.price}
            details={product.desc}
            category={product.category?.name}
            image={product.photo || []}
          />
        </Box>
      )}

      {!loading && showContent && !product && (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {t('card.notFound')}
          </Typography>
        </Container>
      )}
    </Layout>
  );
};
