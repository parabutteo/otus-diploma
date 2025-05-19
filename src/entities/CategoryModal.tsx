import React from 'react';
import { Modal } from '../components';
import { useNavigate } from 'react-router-dom';
import { CategoryForm } from '../features/forms/categoryForm/CategoryForm';
import { useTranslation } from 'react-i18next';

interface CategoryModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCategoryAdded?: () => void; 
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen = true, onClose, onCategoryAdded }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Modal
      title={t('admin.addNewCat')}
      isOpen={isOpen}
      onClose={onClose === undefined ? () => navigate('/admin') : onClose}
    >
      <CategoryForm onCategoryAdded={onCategoryAdded} onClose={onClose} />
    </Modal>
  );
};
