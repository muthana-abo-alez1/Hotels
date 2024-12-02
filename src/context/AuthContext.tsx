import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationRequest } from "interfaces/AuthenticationRequest";
import { useNavigate } from "react-router-dom";
import {
  getToken,
  getUserType,
  removeToken,
  setToken as setTokenCookies,
} from "utils/tokenUtils";
import { ROUTES } from "routes";
import { axiosInstance } from "apis/ApisConfig";
import { loginUser } from "apis/login/authApi";
import { UserType } from "types/UserType";
import { showSuccessSnackbar } from "utils/snackbarUtils";

interface AuthContextProps {
  userType: UserType | null;
  login: (values: AuthenticationRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(getToken() || null);

  const [userType, setUserType] = useState<UserType | null>(
    (getUserType(token) as UserType) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  const login = async (values: AuthenticationRequest): Promise<void> => {
    const response = await loginUser(values);
    const { authentication, userType } = response;
    setToken(authentication);
    setTokenCookies(authentication);
    setUserType(userType);
    if (userType.toLowerCase() === "admin") navigate(`/admin/cities`);
    else if (userType.toLowerCase() === "user") navigate(`/user/home`);
    else navigate(`/`);

    showSuccessSnackbar("Login Successful", "You have logged in successfully.");
  };

  const logout = () => {
    navigate(`/${ROUTES.LOGIN.path}`);
    removeToken();
    setToken(null);
    setUserType(null);
  };

  const isAuthenticated = () => {
    return !!token;
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
