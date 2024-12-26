import { axiosInstance } from "apis/ApisConfig";
import { Hotel, HotelPayload } from "interfaces/Hotel";
import { Photo } from "interfaces/Photo";
import { Review } from "interfaces/Review";
import { specificHotel } from "interfaces/specificHotel";

const API_BASE_URL = "/api";

export const getHotels = async (
  name: string = "",
  searchQuery: string = "",
  pageSize: number = 10,
  pageNumber: number = 1
): Promise<Hotel[]> => {
  try {
    const response = await axiosInstance.get<Hotel[]>(
      `${API_BASE_URL}/hotels`,
      {
        params: {
          name,
          searchQuery,
          pageSize,
          pageNumber,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotel = async (hotelId: number): Promise<specificHotel> => {
  try {
    const response = await axiosInstance.get<specificHotel>(
      `${API_BASE_URL}/hotels/${hotelId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelReviews = async (hotelId: number): Promise<Review[]> => {
  try {
    const response = await axiosInstance.get<Review[]>(
      `${API_BASE_URL}/hotels/${hotelId}/reviews`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getHotelPhotos = async (hotelId: number): Promise<Photo[]> => {
  try {
    const response = await axiosInstance.get<Photo[]>(
      `${API_BASE_URL}/hotels/${hotelId}/gallery`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postHotel = async (
  cityId: string,
  payload: HotelPayload
): Promise<Hotel> => {
  try {
    const requestBody = {
      name: payload.name,
      description: payload.description,
      hotelType: payload.hotelType,
      starRating: payload.starRating,
      latitude: payload.latitude,
      longitude: payload.longitude,
    };
    const response = await axiosInstance.post<Hotel>(
      `${API_BASE_URL}/cities/${cityId}/hotels`,
      requestBody
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateHotel = async (
  hotelId: number,
  payload: HotelPayload
): Promise<Hotel> => {
  try {
    const requestBody = {
      name: payload.name,
      description: payload.description,
      hotelType: payload.hotelType,
      starRating: payload.starRating,
      latitude: payload.latitude,
      longitude: payload.longitude,
    };

    const response = await axiosInstance.put<Hotel>(
      `${API_BASE_URL}/hotels/${hotelId}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHotel = async (
  hotelId: number,
  cityId: string
): Promise<Hotel> => {
  try {
    const response = await axiosInstance.delete<Hotel>(
      `${API_BASE_URL}/cities/${cityId}/hotels/${hotelId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelsFromSpecificCity = async (
  citylId: number
): Promise<Hotel[]> => {
  try {
    const response = await axiosInstance.get<Hotel[]>(
      `${API_BASE_URL}/cities/${citylId}/hotels`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
