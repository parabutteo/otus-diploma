import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../store/hooks';
import { setProfileID, setToken } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { backendErrorMessages, COMMAND_ID } from '../../../shared/constants';
import { AuthMarkUp } from './AuthMarkUp';
import type { TAuthFormData } from './types';
import { useMutation, ApolloError } from '@apollo/client';
import { SIGN_IN, SIGN_UP } from '../../../graphql/mutations/profile';

// Тип для видов формы
type TAuth = 'reg' | 'auth';

interface IAuthForm {
  /** Вид формы */
  authType: TAuth;
}

/**
 * Компонент формы аутентификации
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

export const AuthForm: React.FC<IAuthForm> = ({ authType }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAuthFormData>();

  // Признак формы регистрации
  const isRegProcedure = authType === 'reg';

  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  // Стейт для заполнения ошибки по логину, приходящей с сервера
  const [errorLogin, setErrorLogin] = React.useState<string | null>(null);

  // GraphQL мутация регистрации
  const [signUp] = useMutation(SIGN_UP);
  // GraphQL мутация авторизации
  const [signIn] = useMutation(SIGN_IN);

  const onSubmit = async (data: TAuthFormData) => {
    console.log(`Введенные данные в форме ${isRegProcedure ? 'регистрации' : 'авторизации'}: `, data);

    try {
      const response = isRegProcedure
        ? await signUp({
            variables: {
              email: data.login,
              password: data.pass,
              commandId: COMMAND_ID,
            },
          })
        : await signIn({
            variables: {
              email: data.login,
              password: data.pass,
            },
          });
      console.log('Результат запроса:', response);

      const token = isRegProcedure ? response.data?.profile?.signup?.token : response.data?.profile?.signin?.token;
      const pid = isRegProcedure
        ? response.data?.profile?.signup?.profile?.id
        : response.data?.profile?.signin?.profile?.id;

      if (token) {
        dispatch(setToken(token));
        dispatch(setProfileID(pid));
        reset();
        navigation('/');
      } else {
        setErrorLogin('Ошибка: токен не получен от сервера');
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.graphQLErrors.length > 0) {
          error.graphQLErrors.forEach(({ extensions }) => {
            const code = extensions?.code;
            console.log('GraphQL error: ' + code);
            setErrorLogin(backendErrorMessages[code as string] || 'Неизвестная ошибка');
          });
        }
      } else {
        setErrorLogin('Ошибка соединения с сервером');
      }
    }
  };

  return (
    <AuthMarkUp
      errors={errors}
      register={register}
      errorLogin={errorLogin === null ? '' : errorLogin}
      reset={reset}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      navigation={navigation}
      isRegProcedure={isRegProcedure}
    />
  );
};
