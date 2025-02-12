import { AuthenticationRequest } from "interfaces/AuthenticationRequest";
import { AuthenticationResponse } from "interfaces/AuthenticationResponse";
import { axiosInstance } from "apis/ApisConfig";

const API_BASE_URL = "/api/auth";
export const loginUser = async (
  payload: AuthenticationRequest
): Promise<AuthenticationResponse> => {
    const requestBody = {
      userName: payload.username,
      password: payload.password,
    };

    const response = await axiosInstance.post<AuthenticationResponse>(
      `${API_BASE_URL}/authenticate`,
      requestBody
    );
    return response.data;
};
