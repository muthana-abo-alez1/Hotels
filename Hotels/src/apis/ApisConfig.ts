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
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const handledError = handleError(error);
    showErrorSnackbar("Oops! Something went wrong", handledError.message);
    return Promise.reject(handledError);
  }
);

function handleError(error: any) {
  if (axios.isAxiosError(error) && error.response) {
    const response = error.response;
    const statusCode = response?.status;

    switch (statusCode) {
      case HttpStatusCode.NotFound:
        return { message: "The requested resource could not be found.", type: ErrorTypes.NotFound };
      case HttpStatusCode.BadRequest:
        return { message: "There was an issue with your request. Please try again.", type: ErrorTypes.BadRequest };
      case HttpStatusCode.Conflict:
        return { message: "There seems to be a conflict with the request. Please check and try again.", type: ErrorTypes.Conflict };
      case HttpStatusCode.Unauthorized:
        return { message: "You are not authorized to perform this action. Please log in again.", type: ErrorTypes.Unauthorized };
      default:
        return { message: "Please try again later.", type: ErrorTypes.Unknown };
    }
  } else if (axios.isAxiosError(error) && error.request) {
    if (error.code === "ERR_NETWORK") {
      return { message: "Network error. Please check your internet connection.", type: ErrorTypes.Network };
    }
    return { message: "No response received from the server. Please try again.", type: ErrorTypes.NoResponse };
  } else {
    return { message: "An unknown error occurred. Please try again later.", type: ErrorTypes.Unknown };
  }
}

export { axiosInstance, handleError };
