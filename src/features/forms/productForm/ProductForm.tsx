import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT, PUT_PRODUCT, REMOVE_PRODUCT } from '../../../graphql/mutations/products';
import { Box, Button, MenuItem, Paper, Stack, TextField, Typography, Autocomplete } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GET_CATEGORIES, GET_PRODUCTS_IDS } from '../../../graphql/queries/products';

type TProcedure = 'add' | 'edit';

type TAuthFormData = {
  id: string;
  name: string;
  category: string;
  photo: string;
  price: number;
  details: string;
};

type TCategory = {
  id: string;
  name: string;
};

interface IProductForm {
  procedureType: TProcedure;
}

export const ProductForm: React.FC<IProductForm> = ({ procedureType }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<TAuthFormData>({
    defaultValues: {
      id: '',
      name: '',
      category: '',
      photo: '',
      price: 1,
      details: '',
    },
  });

  const { data: productsIdsData } = useQuery<{
    products: {
      getMany: {
        data: { id: string }[];
      };
    };
  }>(GET_PRODUCTS_IDS, {
    variables: { input: {} },
  });

  const productIds = productsIdsData?.products?.getMany?.data.map((product) => product.id) || [];

  const { t } = useTranslation();

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

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<{
    categories: {
      getMany: {
        data: TCategory[];
      };
    };
  }>(GET_CATEGORIES);

  const categoryList: TCategory[] = categoryData?.categories?.getMany?.data || [];

  if (categoryLoading) {
    return <Typography>{t('productFormAdmin.loadingCategories')}</Typography>;
  }

  if (categoryError) {
    return <Typography color="error">{t('productFormAdmin.errorLoadingCategories')}</Typography>;
  }

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={3}>
        {!isAddProcedure && (
          <Controller
            name="id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={productIds}
                onChange={(_, value) => field.onChange(value || '')}
                renderInput={(params) => (
                  <TextField {...params} label="ID" error={!!errors.id} helperText={errors.id?.message} fullWidth />
                )}
                freeSolo={false}
                clearOnEscape
              />
            )}
          />
        )}

        <TextField
          label={t('productFormAdmin.title')}
          {...register('name', { required: t('productFormAdmin.namePlaceholder') })}
          type="text"
          id="name"
          placeholder={t('productFormAdmin.namePlaceholder')}
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          select
          fullWidth
          label={t('productFormAdmin.category')}
          {...register('category', { required: t('productFormAdmin.category') })}
          id="category"
          error={!!errors.category}
          helperText={errors.category?.message}
        >
          {categoryList.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label={t('productFormAdmin.image')}
          {...register('photo', { required: t('productFormAdmin.imagePlaceholder') })}
          id="photo"
          placeholder={t('productFormAdmin.imagePlaceholder')}
          error={!!errors.photo}
          helperText={errors.photo?.message}
        />

        <TextField
          fullWidth
          label={t('productFormAdmin.details')}
          {...register('details', { required: t('productFormAdmin.detailsPlaceholder') })}
          id="details"
          placeholder={t('productFormAdmin.detailsPlaceholder')}
          error={!!errors.details}
          helperText={errors.details?.message}
        />

        <TextField
          fullWidth
          label={t('productFormAdmin.price')}
          {...register('price', {
            required: 'Введите цену',
            valueAsNumber: true,
            min: { value: 1, message: t('productFormAdmin.priceErr') },
          })}
          type="number"
          id="price"
          placeholder={t('productFormAdmin.pricePlaceholder')}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" size="medium" type="submit" disabled={loading}>
            {isAddProcedure ? t('productFormAdmin.add') : t('productFormAdmin.edit')}
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
              {t('productFormAdmin.delete')}
            </Button>
          )}
        </Box>

        {error && (
          <Typography color="error">
            {t('productFormAdmin.err')}: {error.message}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};
