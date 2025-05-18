import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY } from '../../../graphql/mutations/products';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';

type TAuthFormData = {
  name: string;
};

interface CategoryFormProps {
  onCategoryAdded?: () => void;
  onClose?: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ onCategoryAdded, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAuthFormData>({
    defaultValues: {
      name: '',
    },
  });

  const [addCategory, { loading, error }] = useMutation(ADD_CATEGORY);

  const mapFormDataToMutationInput = (data: TAuthFormData) => ({
    name: data.name,
  });

  const onSubmit = async (data: TAuthFormData) => {
    try {
      await addCategory({ variables: { name: data.name, input: mapFormDataToMutationInput(data) } });
      alert('Категория успешно добавлена!');
      reset();
      onCategoryAdded?.(); // Обновляем список категорий в родителе
      onClose?.(); // Закрываем модальное окно, если передано
    } catch (e) {
      console.error('Ошибка при добавлении категории:', e);
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Название"
          {...register('name', { required: 'Это поле обязательно' })}
          type="text"
          id="name"
          placeholder="Введите идентификатор"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        {error && <Typography color="error">Ошибка: {error.message}</Typography>}

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" size="medium" type="submit" disabled={loading}>
            Добавить
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};
