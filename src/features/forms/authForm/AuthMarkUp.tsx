import React from 'react';
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';
import type { NavigateFunction } from 'react-router-dom';
import type { TAuthFormData } from './types';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IAuthMarkUp {
  errors: FieldErrors<TAuthFormData>;
  register: UseFormRegister<TAuthFormData>;
  errorLogin: string;
  reset: UseFormReset<TAuthFormData>;
  handleSubmit: UseFormHandleSubmit<TAuthFormData>;
  onSubmit: (data: TAuthFormData) => Promise<void>;
  navigation: NavigateFunction;
  isRegProcedure: boolean;
}

export const AuthMarkUp: React.FC<IAuthMarkUp> = ({
  errors,
  register,
  errorLogin,
  reset,
  handleSubmit,
  onSubmit,
  navigation,
  isRegProcedure,
}) => {
  const { t } = useTranslation();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          {...register('login', {
            required: t('auth.loginRequired'),
            pattern: !isRegProcedure
              ? {
                  value: /\S+@\S+\.\S+/,
                  message: t('auth.loginInvalid'),
                }
              : undefined,
          })}
          type="text"
          id="login"
          placeholder={t('auth.loginPlaceholder')}
          fullWidth
          variant="outlined"
          error={!!errors.login || !!errorLogin}
          helperText={errors.login?.message || errorLogin}
        />

        <TextField
          {...register('pass', {
            required: t('auth.passwordRequired'),
            minLength: isRegProcedure
              ? {
                  value: 8,
                  message: t('auth.passwordMin'),
                }
              : undefined,
          })}
          type="password"
          id="pass"
          placeholder={t('auth.passwordPlaceholder')}
          autoComplete="currentPassword"
          fullWidth
          variant="outlined"
          error={!!errors.pass}
          helperText={errors.pass?.message}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            {isRegProcedure ? t('auth.registerBtn') : t('auth.loginBtn')}
          </Button>
          {!isRegProcedure && (
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                navigation('/reg');
                reset();
              }}
            >
              {t('auth.registerBtn')}
            </Button>
          )}
          {isRegProcedure && (
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                navigation('/auth');
                reset();
              }}
            >
              {t('reg.backBtn')}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
