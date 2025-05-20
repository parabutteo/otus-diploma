import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Loader } from '../components';
import { Box, Button, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { ModalItem } from '../shared/ModalItem';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../graphql/queries/products';
import { CategoryModal } from '../shared/CategoryModal';
import { REMOVE_CATEGORY } from '../graphql/mutations/products';

export const Admin: React.FC = () => {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<'edit' | 'add'>('add');

  const openAddModal = () => {
    setIsOpenModal(true);
    setModalType('add');
  };

  const openEditModal = () => {
    setIsOpenModal(true);
    setModalType('edit');
  };

  const navigate = useNavigate();

  // Запрос списка категорий
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES);
  const categoryList = data?.categories?.getMany?.data || [];

  const [isOpenCatModal, setIsOpenCatModal] = React.useState<boolean>(false);

  // Мутация удаления категории с refetchQueries для обновления списка

  const [removeCategory, { loading: removeLoading }] = useMutation(REMOVE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true, // Ждём завершения refetchQueries перед продолжением
  });

  const removeCatHandler = async (id: string) => {
    if (!window.confirm(t('admin.removeConfirm'))) {
      return;
    }
    try {
      await removeCategory({ variables: { removeId: id } });
      alert(t('admin.removeSuccess'));
    } catch (e) {
      console.error('Ошибка при удалении категории:', e);
      alert(t('admin.removeError'));
    }
  };

  // Функция для обновления списка категорий (передаётся в CategoryModal)
  const handleCategoryAdded = () => {
    refetch();
  };

  return (
    <Layout title={t('admin.title')}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t('admin.actions')}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <Button variant="contained" color="primary" onClick={openAddModal}>
          {t('admin.add')}
        </Button>
        <Button variant="outlined" color="primary" onClick={openEditModal}>
          {t('admin.edit')}
        </Button>
      </Stack>

      <Typography variant="h5" sx={{ mt: 8 }}>
        {t('admin.categoryActions')}
      </Typography>
      {loading && <Loader />}
      {error && (
        <Typography color="error">
          {t('admin.loadingError')}: {error.message}
        </Typography>
      )}
      {!loading && !error && (
        <>
          {categoryList.length === 0 ? (
            <Typography>{t('admin.notFound')}</Typography>
          ) : (
            <>
              <Table>
                <TableBody>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {categoryList.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography>{item.name}</Typography>
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() => removeCatHandler(item.id)}
                            disabled={removeLoading}
                          >
                            {t('admin.delete')}
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setIsOpenCatModal(true)}>
                {t('admin.addNewCategory')}
              </Button>
            </>
          )}
        </>
      )}

      <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
        {t('admin.userOrders')}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <Button variant="contained" color="primary" onClick={() => navigate('/admin/orders')}>
          {t('admin.allOrders')}
        </Button>
      </Stack>

      <ModalItem modalType={modalType} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />

      {/* Передаём в CategoryModal функцию обновления списка */}
      <CategoryModal
        isOpen={isOpenCatModal}
        onClose={() => setIsOpenCatModal(false)}
        onCategoryAdded={handleCategoryAdded}
      />

      <Outlet />
    </Layout>
  );
};
