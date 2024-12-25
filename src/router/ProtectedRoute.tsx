import React from 'react';
import { useAuth } from 'context/AuthContext';
import NotFound from 'pages/ErrorPage';
import { showFailureAlert } from 'utils/Alert';
import Login from 'pages/Login';

export const ProtectedRoute: React.FC<{ 
    children: JSX.Element, 
    onlyAdmin?: boolean 
}> = ({ children, onlyAdmin = false }) => {
  const { userType, isAuthenticated  } = useAuth();

  if (!isAuthenticated()) {
    return <Login/>; 
  }

  if (onlyAdmin && userType !== 'Admin') {
    showFailureAlert('You do not have permission to access this page');
    return <NotFound number={403} msg="You do not have permission to access this page" />;
  }

  return children;
};