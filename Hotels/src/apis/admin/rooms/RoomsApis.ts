import { axiosInstance } from "apis/ApisConfig";
import { Amenities } from "interfaces/amenities";
import { Photo } from "interfaces/Photo";
import { Room, RoomResponse } from "interfaces/Room";

const API_BASE_URL = "/api";

export const getRoomsFromSpecificHotel = async (
  hotelId: number,
  checkInDate: string = "test",
  checkOutDate: string = "test"
): Promise<Room[]> => {
  try {
    const response = await axiosInstance.get<Room[]>(
      `${API_BASE_URL}/hotels/${hotelId}/rooms`,
      {
        params: { checkInDate, checkOutDate },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAvailableRoomsFromSpecificHotel = async (
  hotelId: number,
  checkInDate: string = "test",
  checkOutDate: string = "test"
): Promise<Room[]> => {
  try {
    const response = await axiosInstance.get<Room[]>(
      `${API_BASE_URL}/hotels/${hotelId}/available-rooms`,
      {
        params: { checkInDate, checkOutDate },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postRoom = async (
  hotelId: number,
  roomNumber: number,
  cost: number
): Promise<RoomResponse> => {
  try {
    const response = await axiosInstance.post<RoomResponse>(
      `${API_BASE_URL}/hotels/${hotelId}/rooms`,
      {
        roomNumber,
        cost,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (
  hotelId: number,
  roomId: number
): Promise<Room> => {
  try {
    const response = await axiosInstance.delete<Room>(
      `${API_BASE_URL}/hotels/${hotelId}/rooms/${roomId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postPhotoForRoom = async (
  roomId: number,
  url: string
): Promise<Photo> => {
  try {
    const response = await axiosInstance.post<Photo>(
      `${API_BASE_URL}/rooms/${roomId}/photos`,
      {
        url,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAmenityForRoom = async (
  roomId: number,
  name: string,
  description: string
): Promise<Amenities> => {
  try {
    const response = await axiosInstance.post<Amenities>(
      `${API_BASE_URL}/rooms/${roomId}/amenities`,
      {
        name,
        description,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
