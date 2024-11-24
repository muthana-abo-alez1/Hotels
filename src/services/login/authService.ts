import { ILoginPayload } from "interfaces/ILoginPayload.interface";
import { ILoginResponse } from "interfaces/ILoginResponse.interface";
import { axiosInstance, handleError } from "./ApisConfig";
import { setToken, setUserType } from "utils/tokenUtils";
import { showFailureAlert, showSuccessAlert } from "utils/Alert";

const API_BASE_URL = "/api/auth";
export const login = async (
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
    showSuccessAlert("");
    setToken(response.data.authentication);
    setUserType(response.data.userType);

    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    showFailureAlert(handledError.message);

    throw handledError;
  }
};
