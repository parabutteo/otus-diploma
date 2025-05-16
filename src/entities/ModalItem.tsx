import React from 'react';
import { ProductForm } from '../features/forms';
import { Modal } from '../components';
import { useNavigate } from 'react-router-dom';

interface ModalItemProps {
  modalType: 'edit' | 'add';
  isOpen?: boolean;
  onClose?: () => void;
}

export const ModalItem: React.FC<ModalItemProps> = ({ modalType, isOpen = true, onClose }) => {
  const navigate = useNavigate();

  return (
    <Modal
      title={`${modalType === 'add' ? 'Добавление нового' : 'Редактирование имеющегося'} товара`}
      isOpen={isOpen}
      onClose={onClose === undefined ? () => navigate('/admin') : onClose}
    >
      <ProductForm procedureType={modalType === 'add' ? 'add' : 'edit'} />
    </Modal>
  );
};
