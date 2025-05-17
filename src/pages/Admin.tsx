import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '../components';
import { Button, Stack } from '@mui/material';
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

  return (
    <Layout title={t('admin.title')}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <Button variant="contained" color="primary" onClick={openAddModal}>
          {t('admin.add')}
        </Button>
        <Button variant="outlined" color="primary" onClick={openEditModal}>
          {t('admin.edit')}
        </Button>
      </Stack>

      <ModalItem modalType={modalType} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />

      <Outlet />
    </Layout>
  );
};
