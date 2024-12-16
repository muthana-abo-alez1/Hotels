import axios, { HttpStatusCode } from "axios";
import { TIME_OUT } from "constants/Generals";
import { ErrorTypes } from "enum/ErrorsTypes";
import { showErrorSnackbar } from "utils/snackbarUtils";
import { getToken } from "utils/tokenUtils";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: TIME_OUT,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();  

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;  
  },
  (error) => {
    const handledError = handleError(error);  
    showErrorSnackbar("Error", handledError.message);
    return Promise.reject(handledError);  
  }
);
function handleError(error: any) {
  if (axios.isAxiosError(error) && error.response) {
    const response = error.response;
    const message = response?.data?.title || "Error";

    switch (response.status) {
      case HttpStatusCode.NotFound:
        return { message: message, type: ErrorTypes.NotFound };
      case HttpStatusCode.BadRequest:
        return { message: message, type: ErrorTypes.BadRequest };
      case HttpStatusCode.Conflict:
        return { message: message, type: ErrorTypes.Conflict };
      case HttpStatusCode.Unauthorized:
        return { message: message, type: ErrorTypes.Unauthorized };
      default:
        return { message: message, type: ErrorTypes.Unknown };
    }
  } else if (axios.isAxiosError(error) && error.request) {
    if (error.code === "ERR_NETWORK") {
      return { message: error.message, type: ErrorTypes.Network };
    }
    return { message: error.message, type: ErrorTypes.NoResponse };
  } else {
    return { message: error.message, type: ErrorTypes.Unknown };
  }
}

export { axiosInstance, handleError };
