import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import { ROUTES } from 'constants/Routing.constants';
import { ProtectedRoute } from './ProtectedRoute.route';
import UserRoute from './UserRoute.route';
import AdminRoute from './AdminRoute.route';


const AppRouter: React.FC = () => {

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={`${ROUTES.ADMIN}/*`} element={
        <ProtectedRoute onlyAdmin>
          <AdminRoute />
        </ProtectedRoute>
      } />
      <Route path={`${ROUTES.USER}/*`} element={
        <ProtectedRoute >
          <UserRoute />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
