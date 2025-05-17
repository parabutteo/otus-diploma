import * as React from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import { Layout } from '../components';
import { Loader } from '../components/Loader';
import { ShortCard, type IShortCardItem } from '../components/Card/ShortCard';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries/products';
import { COMMAND_ID } from '../shared/constants';

export const Catalog: React.FC = () => {
  const { t } = useTranslation();

  const [visibleCount, setVisibleCount] = React.useState<number>(8);

  // Параметры запроса
  const input = {
    // например: categoryId: 'some-id'
  };

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { input },
  });

  // Получаем массив товаров из данных запроса
  const products = data?.products.getMany.data;

  // Приводим данные к нужному типу
  const normalizedProducts: IShortCardItem[] =
    products && Array.isArray(products)
      ? products
          .filter((p: IShortCardItem) => p.commandId === COMMAND_ID)
          .map((p: IShortCardItem) => ({
            id: p.id,
            name: p.name,
            desc: p.desc,
            price: p.price,
            photo: p.photo,
            category: p.category,
          }))
      : [];

  // Ограничиваем отображение товаров по visibleCount
  const visibleProducts = normalizedProducts.slice(0, visibleCount);

  // Обработчик кнопки "Показать ещё"
  const showMoreBtnHandler = (): void => {
    setVisibleCount((prev) => prev + 4);
  };

  if (loading) return <Loader />;
  if (error) return <Layout title={t('catalogue.title')}><Box p={4}>Ошибка загрузки</Box></Layout>;

  return (
    <Layout title={t('catalogue.title')}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3} columns={12} component="div">
          {visibleProducts.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} component="div">
              <ShortCard item={item} />
            </Grid>
          ))}
        </Grid>

        {visibleCount < normalizedProducts.length && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="outlined" onClick={showMoreBtnHandler}>
              {t('catalogue.showMore')}
            </Button>
          </Box>
        )}
      </Container>
    </Layout>
  );
};
