import React from 'react';
import { Box, Container, Grid, Pagination, Select, MenuItem, InputLabel, FormControl, Stack } from '@mui/material';
import { Layout } from '../components';
import { Loader } from '../components/Loader';
import { ShortCard } from '../components/Card/ShortCard';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { COMMAND_ID } from '../shared/constants';
import { GET_PRODUCTS } from '../graphql/queries/products';
import { type SelectChangeEvent } from '@mui/material/Select';

export interface Category {
  __typename: 'Category';
  id: string;
  name: string;
  photo: string | null;
  commandId: string;
}

export interface Product {
  __typename: 'Product';
  id: string;
  name: string;
  photo: string;
  desc: string;
  price: number;
  category: Category;
  commandId: string;
}

export const Catalog: React.FC = () => {
  const { t } = useTranslation();

  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);
  const [sortDirection, setSortDirection] = React.useState<'ASC' | 'DESC'>('ASC');
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);

  // Запрашиваем все товары без пагинации
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { input: { pagination: { pageNumber: 1, pageSize: 10000 }, sorting: { type: 'ASC', field: 'name' } } },
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    if (!data) return;
    const productsFromServer = data.products.getMany.data || [];
    // Фильтруем по commandId
    const filtered = productsFromServer.filter((p: Product) => p.commandId === COMMAND_ID);
    setAllProducts(filtered);
    setPageNumber(1); // сброс на первую страницу при обновлении данных
  }, [data]);

  // Сортируем все товары на клиенте по цене и направлению
  const sortedProducts = React.useMemo(() => {
    return [...allProducts].sort((a, b) => (sortDirection === 'ASC' ? a.price - b.price : b.price - a.price));
  }, [allProducts, sortDirection]);

  // Вычисляем товары для текущей страницы
  const paginatedProducts = React.useMemo(() => {
    const startIndex = (pageNumber - 1) * pageSize;
    return sortedProducts.slice(startIndex, startIndex + pageSize);
  }, [sortedProducts, pageNumber, pageSize]);

  const totalCount = allProducts.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const onPageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  };

  const onPageSizeChange = (event: SelectChangeEvent) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPageNumber(1);
  };

  const onSortDirectionChange = (event: SelectChangeEvent) => {
    const value = event.target.value as 'ASC' | 'DESC';
    setSortDirection(value);
    setPageNumber(1);
  };

  return (
    <Layout title={t('catalogue.title')}>
      {loading && <Loader />}
      {error && <Box p={4}>Товары не найдены</Box>}
      {!loading && !error && (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="flex-end"
            alignItems="center"
            mt={4}
            mb={2}
            flexWrap="wrap"
          >
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="sort-direction-select-label">{t('catalogue.sortBy') || 'Сортировка по цене'}</InputLabel>
              <Select
                labelId="sort-direction-select-label"
                value={sortDirection}
                label={t('catalogue.sortBy') || 'Сортировка по цене'}
                onChange={onSortDirectionChange}
              >
                <MenuItem value="ASC">{t('catalogue.priceAsc') || 'По возрастанию'}</MenuItem>
                <MenuItem value="DESC">{t('catalogue.priceDesc') || 'По убыванию'}</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Grid container spacing={3} columns={12}>
            {paginatedProducts.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <ShortCard item={item} />
              </Grid>
            ))}
          </Grid>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            mt={4}
            flexWrap="wrap"
          >
            {totalCount > pageSize && (
              <Pagination
                count={totalPages}
                page={pageNumber}
                onChange={onPageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            )}

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="page-size-select-label">{t('catalogue.itemsPerPage')}</InputLabel>
              <Select
                labelId="page-size-select-label"
                value={pageSize.toString()}
                label={t('catalogue.itemsPerPage')}
                onChange={onPageSizeChange}
                sx={{ minWidth: '155px' }}
              >
                {[4, 8, 16, 24, 32].map((size) => (
                  <MenuItem key={size} value={size.toString()}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Container>
      )}
    </Layout>
  );
};
