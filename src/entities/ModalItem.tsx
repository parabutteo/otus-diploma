import React from 'react';
import { ProductForm } from '../features/forms';
import { Modal } from '../components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ModalItemProps {
  modalType: 'edit' | 'add';
  isOpen?: boolean;
  onClose?: () => void;
}

export const ModalItem: React.FC<ModalItemProps> = ({ modalType, isOpen = true, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Modal
      title={`${modalType === 'add' ? t('admin.addNew') : t('admin.editExist')} ${t('admin.good')}`}
      isOpen={isOpen}
      onClose={onClose === undefined ? () => navigate('/admin') : onClose}
    >
      <ProductForm procedureType={modalType === 'add' ? 'add' : 'edit'} />
    </Modal>
  );
};
