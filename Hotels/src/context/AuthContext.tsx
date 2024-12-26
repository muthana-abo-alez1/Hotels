import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationRequest } from "interfaces/AuthenticationRequest";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getToken,
  getUserType,
  removeToken,
  setToken ,
} from "utils/tokenUtils";
import { ROUTES } from "routes";
import { loginUser } from "apis/login/authApi";
import { UserType } from "types/UserType";
import { showErrorSnackbar, showSuccessSnackbar } from "utils/snackbarUtils";

interface AuthContextProps {
  userType: UserType | null;
  login: (values: AuthenticationRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType | null>(() => {
    const token = getToken();
    return token ? (getUserType(token) as UserType) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      if (location.pathname !== `/${ROUTES.LOGIN.path}`) {
        logout()
        showErrorSnackbar("Authentication Error", "Your session has expired.");
        
      }
      return;
    }

    const userTypeFromToken = getUserType(token);
    setUserType(userTypeFromToken as UserType);

  }, [navigate,location.pathname]);

  const login = async (values: AuthenticationRequest): Promise<void> => {
    const response = await loginUser(values);
    const { authentication, userType } = response;
    setToken(authentication);  
    setUserType(userType);
    if (userType.toLowerCase() === "admin") navigate(`/admin/cities`);
    else if (userType.toLowerCase() === "user") navigate(`/user/home`);
    else navigate(`/`);

    showSuccessSnackbar("Login Successful", "You have logged in successfully.");
  };

  const logout = () => {
    removeToken(); 
    setUserType(null); 
    navigate(`/${ROUTES.LOGIN.path}`);
  };

  const isAuthenticated = () => {
    return !!getToken(); 
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
