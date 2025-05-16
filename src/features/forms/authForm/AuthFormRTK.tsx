import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../store/hooks';
import { setToken } from '../../../features/auth/authSlice';
import { randomNumberGenerator } from '../../../features/createRandomProduct';
import { useNavigate } from 'react-router-dom';
import { backendErrorMessages } from '../../../shared/constants';
import { useSingUpMutation } from '../../../shared/api/auth/rtk_signup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { AuthMarkUp } from './AuthMarkUp';
import { TAuthFormData } from './types';

// Тип для видов формы
type TAuth = 'reg' | 'auth';

interface IAuthForm {
  /** Вид формы */
  authType: TAuth;
}

/**
 * Компонент формы аутентификации, работающей на RTK Query
 *
 * Состоит из двух составляющих: регистрация и авторизация
 *
 * Тип формы прокидывается пропсом, но, также, сменяется по нажатию
 * на соответствующую кнопку внутри компонента
 *
 * @param authType тип формы
 *
 * @returns React.FC
 */

export const AuthFormRTK: React.FC<IAuthForm> = ({ authType }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<TAuthFormData>();

  // Признак формы регистрации
  const isRegProcedure = authType === 'reg';

  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const [singUp] = useSingUpMutation();

  // Хендлер для выдачи токена при авторизации
  // Если токен админа -- формируем админский токен, иначе случайный
  const tokenizeHandler = (): void => {
    if (getValues('login') === 'admin@admin.ru') {
      dispatch(setToken('admin'));
    } else {
      const tokenValue = randomNumberGenerator(1000, 9999);
      dispatch(setToken(tokenValue.toString()));
    }
  };

  // Стейт для заполнения ошибки по логину, приходящей с сервера
  const [errorLogin, setErrorLogin] = React.useState<string | null>(null);

  // Тип-гварды для обработки ошибок
  function isFetchBaseQueryError(error: FetchBaseQueryError | SerializedError): error is FetchBaseQueryError {
    return 'status' in error && 'data' in error;
  }
  function isDataObject(data: unknown): data is { errors: { extensions: { code: string } }[] } {
    return typeof data === 'object' && data !== null && 'errors' in data;
  }

  // Хендлер для вывода ошибок с бека
  const handleServerErrors = (error: FetchBaseQueryError | SerializedError) => {
    if (isFetchBaseQueryError(error)) {
      const errorData = error.data;
      if (isDataObject(errorData)) {
        const errors = errorData.errors;
        if (errors && errors.length > 0) {
          const error = errors[0];
          if ('extensions' in error && 'code' in error.extensions) {
            const code = error.extensions.code;
            setErrorLogin(backendErrorMessages[code] || 'Неизвестная ошибка');
          }
        }
      }
    }
  };

  const onSubmit = async (data: TAuthFormData) => {
    console.log(`Введенные данные в форме ${isRegProcedure ? 'регистрации' : 'авторизации'}: `, data);

    if (isRegProcedure) {
      try {
        const response = await singUp({ email: data.login, password: data.pass });
        console.log('Результат запроса:', response);

        if (response?.error) {
          handleServerErrors(response.error);
        } else if (response?.data.token) {
          dispatch(setToken(response.data.token));
          reset();
          navigation('/');
        } else {
          setErrorLogin('Ошибка: токен не получен от сервера');
        }
      } catch (error) {
        setErrorLogin('Ошибка соединения с сервером');
      }
    } else {
      tokenizeHandler();
      reset();
      navigation('/');
    }
  };

  return (
    <AuthMarkUp
      errors={errors}
      register={register}
      errorLogin={errorLogin}
      reset={reset}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      navigation={navigation}
      isRegProcedure={isRegProcedure}
      query="rtk"
    />
  );
};
