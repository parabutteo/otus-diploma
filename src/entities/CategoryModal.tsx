import React from 'react';
import { Modal } from '../components';
import { useNavigate } from 'react-router-dom';
import { CategoryForm } from '../features/forms/categoryForm/CategoryForm';

interface CategoryModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCategoryAdded?: () => void; 
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen = true, onClose, onCategoryAdded }) => {
  const navigate = useNavigate();

  return (
    <Modal
      title="Добавление категории"
      isOpen={isOpen}
      onClose={onClose === undefined ? () => navigate('/admin') : onClose}
    >
      <CategoryForm onCategoryAdded={onCategoryAdded} onClose={onClose} />
    </Modal>
  );
};
