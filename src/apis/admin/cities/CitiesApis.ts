import { axiosInstance, handleError } from "apis/ApisConfig";
import { City } from "interfaces/City";
import { CityRequste } from "interfaces/CityRequset";

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
    throw error;
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
    throw error;
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
    throw error;
  }
};

export const deleteCity = async (id: number): Promise<City> => {
    const response = await axiosInstance.delete<City>(
      `${API_BASE_URL}/cities/${id}`,
      {
        params: { includeHotels: false },
      }
    );
    return response.data;
};

export const updateCity = async (id: number, cityData: { name: string; description: string }): Promise<City> => {
  try {
    const response = await axiosInstance.put<City>(`${API_BASE_URL}/cities/${id}`, cityData);
    return response.data;
  } catch (error) {
    throw error
  }
};