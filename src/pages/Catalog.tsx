import React from 'react';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
} from '@mui/material';
import { Layout } from '../components';
import { Loader } from '../components/Loader';
import { ShortCard, type IShortCardItem } from '../components/Card/ShortCard';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { COMMAND_ID } from '../shared/constants';
import { GET_PRODUCTS } from '../graphql/queries/products';

export const Catalog: React.FC = () => {
  const { t } = useTranslation();

  const defaultPageSize = 10;
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const [sortDirection, setSortDirection] = React.useState<'ASC' | 'DESC'>('ASC');
  const [products, setProducts] = React.useState<any[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const input = React.useMemo(() => ({
    pagination: { pageNumber, pageSize },
    sorting: { type: 'ASC', field: 'name' },
  }), [pageNumber, pageSize]);

  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: { input },
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    if (!data) return;
    const productsFromServer = data.products.getMany.data || [];
    const totalFromServer = data.products.getMany.pagination.total || 0;
    setTotalCount(totalFromServer);
    setProducts(productsFromServer);
  }, [data]);

  const sortedProducts: IShortCardItem[] = React.useMemo(() => {
    return products
      .filter(p => p.commandId === COMMAND_ID)
      .map(p => ({
        id: p.id,
        name: p.name,
        desc: p.desc,
        price: p.price,
        photo: p.photo,
        category: p.category,
      }))
      .sort((a, b) => (sortDirection === 'ASC' ? a.price - b.price : b.price - a.price));
  }, [products, sortDirection]);

  const onPageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  };

  const onPageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPageNumber(1);
    setProducts([]);
    refetch({
      input: {
        pagination: { pageNumber: 1, pageSize: newSize },
        sorting: { type: 'ASC', field: 'name' },
      },
    });
  };

  const onSortDirectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortDirection(event.target.value as 'ASC' | 'DESC');
  };

  if (loading && pageNumber === 1) return <Loader />;
  if (error)
    return (
      <Layout title={t('catalogue.title')}>
        <Box p={4}>{t('catalogue.errorLoading') || 'Ошибка загрузки'}</Box>
      </Layout>
    );

  return (
    <Layout title={t('catalogue.title')}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3} columns={12}>
          {sortedProducts.length === 0 && (
            <Box p={4} width="100%" textAlign="center">
              {t('catalogue.noProducts') || 'Товары не найдены'}
            </Box>
          )}
          {sortedProducts.map(item => (
            <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
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
              count={Math.ceil(totalCount / pageSize)}
              page={pageNumber}
              onChange={onPageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          )}

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="page-size-select-label">
              {t('catalogue.itemsPerPage') || 'Товаров на странице'}
            </InputLabel>
            <Select
              labelId="page-size-select-label"
              value={pageSize}
              label={t('catalogue.itemsPerPage') || 'Товаров на странице'}
              onChange={onPageSizeChange}
            >
              {[5, 10, 20, 30].map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="sort-direction-select-label">
              {t('catalogue.sortByPrice') || 'Сортировка по цене'}
            </InputLabel>
            <Select
              labelId="sort-direction-select-label"
              value={sortDirection}
              label={t('catalogue.sortByPrice') || 'Сортировка по цене'}
              onChange={onSortDirectionChange}
            >
              <MenuItem value="ASC">{t('catalogue.priceAsc') || 'По возрастанию'}</MenuItem>
              <MenuItem value="DESC">{t('catalogue.priceDesc') || 'По убыванию'}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Container>
    </Layout>
  );
};
