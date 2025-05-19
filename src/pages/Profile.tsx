import * as React from 'react';
import { Layout, Loader } from '../components';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Divider, Box, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { GET_PROFILE, UPDATE_PROFILE } from '../graphql/queries/profile';

export type ProfileT = {
  id: string;
  name: string;
  email: string;
};

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: profileData, loading: profileLoading, error: profileError, refetch } = useQuery(GET_PROFILE);

  type TProfileFormData = {
    name: string;
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TProfileFormData>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  // Принудительное обновление данных профиля при заходе на страницу
  React.useEffect(() => {
    refetch();
  }, [refetch]);

  // Обновление формы при получении новых данных профиля
  React.useEffect(() => {
    if (profileData?.profile) {
      reset({
        name: profileData.profile.name,
        email: profileData.profile.email,
      });
    }
  }, [profileData, reset]);

  const [updateProfile, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      refetch();
      alert('Профиль успешно обновлен');
    },
  });

  // Серверный паттерн: минимум 7 символов, буквы, цифры, _, -
  const namePattern = /^[_a-zа-я0-9-]{7,}$/i;

  const onSubmit = (formData: TProfileFormData) => {
    updateProfile({
      variables: {
        input: {
          name: formData.name,
        },
      },
    });
  };

  return (
    <Layout title={t('profilePage.title')}>
      {profileLoading && <Loader />}
      {profileError && <p>Ошибка загрузки профиля: {profileError.message}</p>}
      {updateError && <p>Ошибка обновления профиля: {updateError.message}</p>}

      {!profileLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Stack spacing={4}>
              <TextField
                fullWidth
                label={t('profileForm.name')}
                placeholder={t('profileForm.namePlaceholder')}
                {...register('name', {
                  required: t('profileForm.nameRequired'),
                  pattern: {
                    value: namePattern,
                    message:
                      t('profileForm.nameInvalid') ||
                      'Имя должно содержать только буквы, цифры, _ или -, минимум 7 символов',
                  },
                  minLength: {
                    value: 7,
                    message: 'Минимум 7 символов',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                fullWidth
                label="Email"
                {...register('email')}
                disabled
              />
              <Box display="flex" justifyContent="flex-end">
                <Button variant="outlined" type="submit" disabled={updateLoading}>
                  {t('profilePage.edit')}
                </Button>
              </Box>
            </Stack>
            <Divider />
            <Button variant="contained" onClick={() => navigate('/profile/orders')} sx={{ alignSelf: 'flex-start' }}>
              {t('profilePage.orders')}
            </Button>
          </Stack>
        </form>
      )}
    </Layout>
  );
};
