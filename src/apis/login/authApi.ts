import { AuthenticationRequest } from "interfaces/AuthenticationRequest";
import { AuthenticationResponse } from "interfaces/AuthenticationResponse";
import { axiosInstance, handleError } from "apis/ApisConfig";
import { showErrorSnackbar } from "utils/snackbarUtils";

const API_BASE_URL = "/api/auth";
export const loginUser = async (
  payload: AuthenticationRequest
): Promise<AuthenticationResponse> => {
  try {
    const requestBody = {
      userName: payload.username,
      password: payload.password,
    };

    const response = await axiosInstance.post<AuthenticationResponse>(
      `${API_BASE_URL}/authenticate`,
      requestBody
    );
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    showErrorSnackbar("Error",handledError.message);
    throw handledError;
  }
};
