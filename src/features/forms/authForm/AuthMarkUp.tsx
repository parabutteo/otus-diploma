import React from 'react';
import clsx from 'clsx';
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';
import type { NavigateFunction } from 'react-router-dom';
import type { TAuthFormData } from './types';
import { Button, Stack, TextField } from '@mui/material';

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
}) => (
  <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          {...register('login', {
            required: 'Значение поля "логин" пустое',
            pattern: !isRegProcedure
              ? {
                  value: /\S+@\S+\.\S+/,
                  message: 'Введите корректный адрес электронной почты',
                }
              : undefined,
          })}
          className={clsx((errors.login || errorLogin) && 'error-field')}
          type="text"
          id="login"
          placeholder="Укажите логин"
          fullWidth
          variant="outlined"
        />
        {errors.login && !errorLogin && <p className="error">{errors.login.message}</p>}
        {errorLogin && <p className="error">{errorLogin}</p>}

        <TextField
          {...register('pass', {
            required: 'Значение поля "пароль" пустое',
            minLength: isRegProcedure
              ? {
                  value: 8,
                  message: 'Пароль должен содержать минимум 8 символов',
                }
              : undefined,
          })}
          className={clsx(errors.pass && 'error-field')}
          type="password"
          id="pass"
          placeholder="Укажите пароль"
          autoComplete="currentPassword"
          fullWidth
          variant="outlined"
        />
        {errors.pass && <p className="error">{errors.pass.message}</p>}

        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            {isRegProcedure ? 'Зарегистрироваться' : 'Войти'}
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
              Зарегистрироваться
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
              Назад ко входу
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  </>
);
