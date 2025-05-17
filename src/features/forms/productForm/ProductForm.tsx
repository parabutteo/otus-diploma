import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import clsx from 'clsx';
import { CATEGORY } from '../../../shared/constants';
import { ADD_PRODUCT, PUT_PRODUCT, REMOVE_PRODUCT } from '../../../graphql/mutations/products';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  productData?: {
    id: string;
    name: string;
    categoryId: string;
    photo: string;
    price: number;
    desc: string;
  };
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

export const ProductForm: React.FC<IProductForm> = ({ procedureType, productData }) => {
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

  React.useEffect(() => {
    if (!isAddProcedure && productData) {
      reset({
        id: productData.id,
        name: productData.name,
        category: productData.categoryId,
        photo: productData.photo,
        price: productData.price,
        details: productData.desc,
      });
    } else {
      reset({
        id: '',
        name: '',
        category: '',
        photo: '',
        price: 0,
        details: '',
      });
    }
  }, [isAddProcedure, productData, reset]);

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
        await addProduct({
          variables: {
            input: mapFormDataToMutationInput(data),
          },
        });
        alert('Товар успешно добавлен!');
      } else {
        await putProduct({
          variables: {
            putId: data.id,
            input: mapFormDataToMutationInput(data),
          },
        });
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
        await deleteProduct({
          variables: { removeId: id },
        });
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
    <form className="margin-top-24 form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {!isAddProcedure && (
          <>
            <TextField
              fullWidth
              label="ID"
              {...register('id', { required: true })}
              className={clsx(errors.id && 'error-field', 'grid-content')}
              type="text"
              id="id"
              placeholder="Введите идентификатор"
            />
          </>
        )}

        <div className="grid-content">
          <TextField
            label={t('productForm.title')}
            {...register('name', { required: 'Введите название товара' })}
            className={clsx(errors.name && 'error-field', 'grid-content')}
            type="text"
            id="name"
            placeholder="Введите название"
            fullWidth
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="grid-content">
          <TextField
            select
            fullWidth
            label={t('productForm.category')}
            {...register('category', { required: 'Выберите категорию' })}
            className={clsx(errors.category && 'error-field', 'grid-content')}
            id="category"
          >
            <MenuItem value={CATEGORY.tshirt}>Футболки, рубашки</MenuItem>
            <MenuItem value={CATEGORY.outware}>Верхняя одежда</MenuItem>
            <MenuItem value={CATEGORY.shoes}>Обувь</MenuItem>
          </TextField>
          {errors.category && <p className="error">{errors.category.message}</p>}
        </div>

        <div className="grid-content">
          <TextField
            fullWidth
            label={t('productForm.image')}
            {...register('photo', { required: 'Введите путь к изображению' })}
            className={clsx(errors.photo && 'error-field', 'grid-content')}
            id="photo"
            placeholder="Введите адрес изображения"
          />
          {errors.photo && <p className="error">{errors.photo.message}</p>}
        </div>

        <div className="grid-content">
          <TextField
            fullWidth
            label={t('productForm.details')}
            {...register('details', { required: 'Введите описание товара' })}
            className={clsx(errors.details && 'error-field', 'grid-content')}
            id="details"
            placeholder="Введите описание"
          />
          {errors.details && <p className="error">{errors.details.message}</p>}
        </div>

        <div className="grid-content">
          <TextField
            fullWidth
            label={t('productForm.price')}
            {...register('price', {
              required: 'Введите цену',
              valueAsNumber: true,
              min: { value: 0, message: 'Цена должна быть больше или равна 0' },
            })}
            className={clsx(errors.price && 'error-field', 'grid-content')}
            type="number"
            id="price"
            placeholder="Введите цену"
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>
      </Stack>

      <Button variant="outlined" size="small" sx={{ mt: 2 }} type="submit" disabled={loading}>
        {isAddProcedure ? t('productForm.add') : t('productForm.edit')}
      </Button>

      {!isAddProcedure && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          sx={{ ml: 2, mt: 2 }}
          type="button"
          onClick={deleteHandler}
          disabled={loading}
        >
          {t('productForm.delete')}
        </Button>
      )}

      {error && <p className="error">Ошибка: {error.message}</p>}
    </form>
  );
};
