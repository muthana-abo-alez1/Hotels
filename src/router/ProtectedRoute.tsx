import React from 'react';
import { useAuth } from 'context/AuthContext';
import NotFound from 'pages/NotFound';
import { showFailureAlert } from 'utils/Alert';

export const ProtectedRoute: React.FC<{ 
    children: JSX.Element, 
    onlyAdmin?: boolean 
}> = ({ children, onlyAdmin = false }) => {
  const { userType, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <NotFound number={401} msg="Unauthorized" />;
  }

  if (onlyAdmin && userType !== 'Admin') {
    showFailureAlert('You do not have permission to access this page');
    return <NotFound number={403} msg="You do not have permission to access this page" />;
  }

  return children;
};
