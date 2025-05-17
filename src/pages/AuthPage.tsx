import * as React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LangAndHomeControls } from '../components';
import { AuthForm } from '../features/forms';

export const AuthPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={2}
    >
      <Box maxWidth={600} width="100%">
        <LangAndHomeControls />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t('auth.title')}
        </Typography>

        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <AuthForm authType="auth" />
        </Paper>
      </Box>
    </Box>
  );
};
