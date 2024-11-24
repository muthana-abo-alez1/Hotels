import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from 'constants/Routing.constants';
import { getToken, getUserType } from 'utils/tokenUtils';
import { UserType } from 'enum/UserType.enum';
import { showFailureAlert } from 'utils/Alert';

export const ProtectedRoute: React.FC<{ 
    children: JSX.Element, 
    onlyAdmin?: boolean 
  }> = ({ children, onlyAdmin = false }) => {
  
    const token = getToken();
    const userType = getUserType();
  
    if (!token) {
      return <Navigate to={ROUTES.LOGIN} />; 
    }
  
    if (onlyAdmin && userType !== UserType.ADMIN) {
      showFailureAlert("Unauthorized")
      return <Navigate to={ROUTES.NOTFOUND} />; 
    }
  
  
    return children;
  };