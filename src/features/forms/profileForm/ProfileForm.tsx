import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField, Paper } from '@mui/material';
import { type ProfileT } from '../../../pages/Profile';
import { useTranslation } from 'react-i18next';

interface IProfileForm {
  form: ProfileT;
  setForm: React.Dispatch<React.SetStateAction<ProfileT | null>>;
  sendHandler: () => void;
}

type TProfileFormData = {
  name: string;
  aboutMe: string;
};

export const ProfileForm: React.FC<IProfileForm> = ({ form, setForm, sendHandler }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProfileFormData>();
  const { t, i18n } = useTranslation();

  const namePattern = i18n.language === 'en' ? /^[A-Za-z\s]+$/ : /^[А-Яа-я\s]+$/;

  const onSubmit = (data: TProfileFormData) => {
    console.log('Введенные данные в форме профиля: ', data);
    sendHandler();
    reset();
  };

  return (
    <Paper
      component="form"
      elevation={3}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 4, borderRadius: 3 }}
      
    >
      <Stack spacing={3}>
        <Box>
          <TextField
            fullWidth
            label={t('profileForm.name')}
            placeholder={t('profileForm.namePlaceholder')}
            defaultValue={form.name}
            {...register('name', {
              required: t('profileForm.nameRequired'),
              pattern: {
                value: namePattern,
                message: t('profileForm.nameInvalid'),
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label={t('profileForm.about')}
            placeholder={t('profileForm.aboutPlaceholder')}
            defaultValue={form.aboutMe}
            {...register('aboutMe', {
              required: t('profileForm.aboutRequired')
            })}
            error={!!errors.aboutMe}
            helperText={errors.aboutMe?.message}
            onChange={(e) => setForm({ ...form, aboutMe: e.target.value })}
          />
        </Box>

        <Box>
          <Button type="submit" variant="contained">
            {t('profileForm.submit')}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};
