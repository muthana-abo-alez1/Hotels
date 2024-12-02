import { axiosInstance, handleError } from "apis/ApisConfig";
import { City } from "interfaces/City";
import { CityRequste } from "interfaces/CityRequset";
import { showErrorSnackbar } from "utils/snackbarUtils";

const API_BASE_URL = "/api";

export const postCity = async (
  payload: CityRequste
): Promise<City> => {
  try {
    const requestBody = {
      name: payload.name,
      description: payload.description,
    };

    const response = await axiosInstance.post<City>(
      `${API_BASE_URL}/cities`,
      requestBody
    );
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    showErrorSnackbar("Error",handledError.message);
    throw handledError;
  }
};

export const getCities = async (
  name: string = '', 
  searchQuery: string = '', 
  pageSize: number = 10, 
  pageNumber: number = 1
): Promise<City[]> => {
  try {
    const response = await axiosInstance.get<City[]>(`${API_BASE_URL}/cities`, {
      params: {
        name, 
        searchQuery, 
        pageSize, 
        pageNumber 
      }
    });
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    showErrorSnackbar("Error", handledError.message);
    throw handledError;
  }
};

export const getCity = async (id: number): Promise<City> => {
  try {
    const response = await axiosInstance.get<City>(
      `${API_BASE_URL}/cities/${id}`,
      {
        params: { includeHotels: false },
      }
    );
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    showErrorSnackbar("Error", handledError.message);
    throw handledError;
  }
};

export const deleteCity = async (id: number): Promise<City> => {
  try {
    const response = await axiosInstance.delete<City>(
      `${API_BASE_URL}/cities/${id}`,
      {
        params: { includeHotels: false },
      }
    );
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    showErrorSnackbar("Error", handledError.message);
    throw handledError;
  }
};

export const updateCity = async (id: number, cityData: { name: string; description: string }): Promise<City> => {
  try {
    const response = await axiosInstance.put<City>(`${API_BASE_URL}/cities/${id}`, cityData);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    showErrorSnackbar("Error", handledError.message);
    throw handledError
  }
};