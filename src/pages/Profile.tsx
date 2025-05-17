import * as React from 'react';
import { Layout } from '../components';
import { ProfileForm } from '../features/forms';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateProfile } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Stack,
  Typography,
  Divider,
  Paper,
  Box,
  Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export type ProfileT = {
  id: string;
  name: string;
  email: string;
  aboutMe: string;
};

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profileInfo = useAppSelector((state) => state.auth.profile);
  const { t } = useTranslation();

  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

  const [form, setForm] = React.useState<ProfileT | null>(null);

  React.useEffect(() => {
    if (profileInfo) {
      setForm({
        id: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        aboutMe: profileInfo.aboutMe,
      });
    }
  }, [profileInfo]);

  const sendHandler = (): void => {
    if (!form) return;
    setIsEditMode(false);
    const newProfile = {
      ...form,
      aboutMe: form.aboutMe,
      name: form.name,
    };
    dispatch(updateProfile(newProfile));
  };

  if (!profileInfo || !form) {
    return (
      <Layout title={t('profilePage.title')}>
        <Alert severity="error">{t('profilePage.noData')}</Alert>
      </Layout>
    );
  }

  return (
    <Layout title={t('profilePage.title')}>
      <Stack spacing={4}>
        <Button variant="outlined" onClick={() => navigate('/profile/orders')} sx={{ alignSelf: 'flex-start' }}>
          {t('profilePage.orders')}
        </Button>

        <Divider />

        {!isEditMode ? (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {t('profilePage.name')}
                </Typography>
                <Typography>{form.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {t('profilePage.about')}
                </Typography>
                <Typography>{form.aboutMe}</Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={() => setIsEditMode(true)}>{t('profilePage.edit')}</Button>
              </Box>
            </Stack>
          </Paper>
        ) : (
          <ProfileForm form={form} setForm={setForm} sendHandler={sendHandler} />
        )}
      </Stack>
    </Layout>
  );
};
