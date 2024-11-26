import React, { createContext, useContext, useEffect, useState } from "react";
import { ILoginPayload } from "interfaces/AuthenticationRequest";
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

interface AuthContextProps {
  userType: UserType | null;
  login: (values: ILoginPayload) => Promise<void>;
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

  const login = async (values: ILoginPayload): Promise<void> => {
    try {
      const response = await loginUser(values);
      const { authentication, userType } = response;
      setToken(authentication);
      setTokenCookies(authentication);
      setUserType(userType);
      navigate(`/${userType.toLowerCase()}/${ROUTES.HOME.path}`);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const isAuthenticated = () => {
    return !!token;
  };
  const logout = () => {
    setToken(null);
    setUserType(null);
    removeToken();
    navigate(`/${ROUTES.LOGIN.path}`);
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
