import React from 'react';
import { Route, Routes } from 'react-router';
import {
  AccessDenied,
  Admin,
  AdminOrders,
  AuthPage,
  Basket,
  Card,
  Catalog,
  NotFound,
  Orders,
  Profile,
  RegisterPage,
} from '../../pages';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initializeApp } from '../../features/app/appSlice';
import { ADMIN_ID } from '../../shared/constants';
import { ModalItem } from '../../entities/ModalItem';

export const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const profileId = useAppSelector((state) => state.auth.profileId);

  React.useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  // Признак авторизованного пользователя
  const userIsAuth = token !== null;
  // Признак админской роли
  const isAdminRole = profileId === ADMIN_ID;

  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/reg" element={<RegisterPage />} />
      <Route path="/cart" element={<Basket />} />
      <Route path="/card/:category/id/:id" element={<Card />} />
      <Route path="/profile" element={userIsAuth ? <Profile /> : <AccessDenied />} />
      <Route path="/profile/orders" element={userIsAuth ? <Orders /> : <AccessDenied />} />
      <Route path="*" element={<NotFound />} />
      {userIsAuth && isAdminRole && (
        <>
          <Route path="/admin" element={<Admin />}>
            <Route path="add-item" element={<ModalItem modalType="add" />} />
            <Route path="edit-item" element={<ModalItem modalType="edit" />} />
          </Route>
          <Route path="/admin/orders" element={<AdminOrders />} />
        </>
      )}
    </Routes>
  );
};
