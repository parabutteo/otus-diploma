import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from '../components';
import { Button, Stack, Typography } from '@mui/material';
import { ModalItem } from '../entities/ModalItem';
import { useTranslation } from 'react-i18next';

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

  return (
    <Layout title={t('admin.title')}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Действия с товарами:
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <Button variant="contained" color="primary" onClick={openAddModal}>
          {t('admin.add')}
        </Button>
        <Button variant="outlined" color="primary" onClick={openEditModal}>
          {t('admin.edit')}
        </Button>
      </Stack>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Заказы пользователей:
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <Button variant="contained" color="primary" onClick={() => navigate('/admin/orders')}>
          Все заказы
        </Button>
      </Stack>

      <ModalItem modalType={modalType} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />

      <Outlet />
    </Layout>
  );
};
