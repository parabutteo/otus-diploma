import * as React from 'react';
import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/hooks';
import { addProduct, editProduct } from '../../products/productsSlice';

interface ProductFormProps {
  /** Признак добавления нового товара */
  isAddProcedure: boolean;
  /** Значения по умолчанию */
  defaultFieldValue?: {
    /** ID товара */
    id: string;
    /** Название */
    title: string;
    /** Описание */
    details: string;
    /** Цена */
    price: number;
    /** Ссылка на изображение */
    image: string;
    /** Категория */
    category: string;
  };
  /** Обработчик удаления по ID */
  deleteHandler: (id: string) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  isAddProcedure,
  defaultFieldValue,
  deleteHandler,
}) => {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: defaultFieldValue || {
      title: '',
      details: '',
      price: 0,
      image: '',
      category: '',
    },
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log('submit', data);
    if (isAddProcedure) {
      dispatch(addProduct(data));
    } else {
      dispatch(editProduct(data));
    }
    reset();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 4, borderRadius: 3, maxWidth: 500, mx: 'auto' }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {isAddProcedure ? t('productForm.addTitle') : t('productForm.editTitle')}
      </Typography>

      <Stack spacing={2}>
        <TextField label={t('productForm.title')} fullWidth {...register('title')} />
        <TextField label={t('productForm.details')} fullWidth {...register('details')} />
        <TextField label={t('productForm.price')} type="number" fullWidth {...register('price')} />
        <TextField label={t('productForm.image')} fullWidth {...register('image')} />
        <TextField label={t('productForm.category')} select fullWidth {...register('category')}>
          <MenuItem value="clothes">{t('productForm.categories.clothes')}</MenuItem>
          <MenuItem value="electronics">{t('productForm.categories.electronics')}</MenuItem>
          <MenuItem value="other">{t('productForm.categories.other')}</MenuItem>
        </TextField>

        <Button type="submit" size="small" sx={{ mt: 2 }}>
          {isAddProcedure ? t('productForm.add') : t('productForm.save')}
        </Button>
        {!isAddProcedure && (
          <Button
            size="small"
            sx={{ mt: 2 }}
            onClick={() => deleteHandler(watch('id'))}
          >
            {t('productForm.delete')}
          </Button>
        )}
      </Stack>
    </Paper>
  );
};
