import { ILoginPayload } from "interfaces/AuthenticationRequest";
import { ILoginResponse } from "interfaces/AuthenticationResponse";
import { axiosInstance, handleError } from "apis/ApisConfig";
import { showErrorSnackbar } from "utils/snackbarUtils";

const API_BASE_URL = "/api/auth";
export const loginUser = async (
  payload: ILoginPayload
): Promise<ILoginResponse> => {
  try {
    const requestBody = {
      userName: payload.username,
      password: payload.password,
    };

    const response = await axiosInstance.post<ILoginResponse>(
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
