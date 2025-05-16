import React from 'react';
import { Route, Routes } from 'react-router';
import { Admin, AuthPage, Basket, Catalog, NotFound, RegisterPage } from '../../pages';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initializeApp } from '../../features/app/appSlice';
import { ADMIN_ID } from '../../shared/constants';
import { ModalItem } from '../../entities/ModalItem';

export const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const profileId = useAppSelector((state) => state.auth.profileId);
  const isInit = useAppSelector((state) => state.app.initialized);

  React.useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  // Признак авторизованного пользователя
  const userIsAuth = token !== null;
  // Признак админской роли
  const isAdminRole = profileId === ADMIN_ID;

  console.log(`Приложение ${isInit ? '' : 'не '}инициализированно`);
  console.log('Токен юзера: ' + token);

  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/reg" element={<RegisterPage />} />
      <Route path="/cart" element={<Basket />} />
      <Route path="*" element={<NotFound />} />
      {userIsAuth && isAdminRole && (
        <Route path="/admin" element={<Admin />}>
          <Route path="add-item" element={<ModalItem modalType="add" />} />
          <Route path="edit-item" element={<ModalItem modalType="edit" />} />
        </Route>
      )}
    </Routes>
  );
};
