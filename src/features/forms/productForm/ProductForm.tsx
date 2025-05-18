import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CATEGORY } from '../../../shared/constants';
import { ADD_PRODUCT, PUT_PRODUCT, REMOVE_PRODUCT } from '../../../graphql/mutations/products';
import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// тип процедуры: добавление или редактирование
type TProcedure = 'add' | 'edit';

type TAuthFormData = {
  id: string;
  name: string;
  category: string;
  photo: string;
  price: number;
  details: string;
};

interface IProductForm {
  /** Вид формы */
  procedureType: TProcedure;
}

/**
 * Компонент добавления/редактирования продукта
 *
 * Тип формы прокидывается пропсом
 *
 * @param procedureType тип процедуры
 *
 * @returns React.FC
 */
export const ProductForm: React.FC<IProductForm> = ({ procedureType }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TAuthFormData>({
    defaultValues: {
      id: '',
      name: '',
      category: '',
      photo: '',
      price: 0,
      details: '',
    },
  });

  const { t } = useTranslation();

  // Признак формы с типом "добавление товара"
  const isAddProcedure = procedureType === 'add';

  const [addProduct, { loading: addLoading, error: addError }] = useMutation(ADD_PRODUCT);
  const [putProduct, { loading: putLoading, error: putError }] = useMutation(PUT_PRODUCT);
  const [deleteProduct, { loading: deleteLoading, error: deleteError }] = useMutation(REMOVE_PRODUCT);

  const mapFormDataToMutationInput = (data: TAuthFormData) => ({
    name: data.name,
    price: Number(data.price),
    desc: data.details,
    photo: data.photo,
    categoryId: data.category,
  });

  const onSubmit = async (data: TAuthFormData) => {
    try {
      if (isAddProcedure) {
        await addProduct({ variables: { input: mapFormDataToMutationInput(data) } });
        alert('Товар успешно добавлен!');
      } else {
        await putProduct({ variables: { putId: data.id, input: mapFormDataToMutationInput(data) } });
        alert('Товар успешно обновлен!');
      }
      reset();
    } catch (e) {
      console.error('Ошибка при сохранении товара:', e);
    }
  };

  const deleteHandler = async () => {
    const id = watch('id');
    if (!id) {
      alert('ID товара не указан');
      return;
    }
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      try {
        await deleteProduct({ variables: { removeId: id } });
        alert(`Товар с ID ${id} успешно удалён`);
        reset();
      } catch (e) {
        console.error('Ошибка при удалении товара:', e);
        alert('Ошибка при удалении товара');
      }
    }
  };

  const loading = isAddProcedure ? addLoading : putLoading || deleteLoading;
  const error = isAddProcedure ? addError : putError || deleteError;

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={3}>
        {!isAddProcedure && (
          <TextField
            fullWidth
            label="ID"
            {...register('id', { required: true })}
            type="text"
            id="id"
            placeholder="Введите идентификатор"
            error={!!errors.id}
            helperText={errors.id?.message}
          />
        )}

        <TextField
          label={t('productForm.title')}
          {...register('name', { required: 'Введите название товара' })}
          type="text"
          id="name"
          placeholder="Введите название"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        {errors.name && <Typography color="error">{errors.name.message}</Typography>}

        <TextField
          select
          fullWidth
          label={t('productForm.category')}
          {...register('category', { required: 'Выберите категорию' })}
          id="category"
        >
          <MenuItem value={CATEGORY.tshirt}>Футболки, рубашки</MenuItem>
          <MenuItem value={CATEGORY.outware}>Верхняя одежда</MenuItem>
          <MenuItem value={CATEGORY.shoes}>Обувь</MenuItem>
        </TextField>
        {errors.category && <Typography color="error">{errors.category.message}</Typography>}

        <TextField
          fullWidth
          label={t('productForm.image')}
          {...register('photo', { required: 'Введите путь к изображению' })}
          id="photo"
          placeholder="Введите адрес изображения"
          error={!!errors.photo}
          helperText={errors.photo?.message}
        />
        {errors.photo && <Typography color="error">{errors.photo.message}</Typography>}

        <TextField
          fullWidth
          label={t('productForm.details')}
          {...register('details', { required: 'Введите описание товара' })}
          id="details"
          placeholder="Введите описание"
          error={!!errors.details}
          helperText={errors.details?.message}
        />
        {errors.details && <Typography color="error">{errors.details.message}</Typography>}

        <TextField
          fullWidth
          label={t('productForm.price')}
          {...register('price', {
            required: 'Введите цену',
            valueAsNumber: true,
            min: { value: 0, message: 'Цена должна быть больше или равна 0' },
          })}
          type="number"
          id="price"
          placeholder="Введите цену"
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        {errors.price && <Typography color="error">{errors.price.message}</Typography>}

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" size="medium" type="submit" disabled={loading}>
            {isAddProcedure ? t('productForm.add') : t('productForm.edit')}
          </Button>

          {!isAddProcedure && (
            <Button
              variant="outlined"
              color="error"
              size="medium"
              type="button"
              onClick={deleteHandler}
              disabled={loading}
            >
              {t('productForm.delete')}
            </Button>
          )}
        </Box>

        {error && <Typography color="error">Ошибка: {error.message}</Typography>}
      </Stack>
    </Paper>
  );
};
