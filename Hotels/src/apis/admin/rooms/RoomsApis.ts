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
    const response = await axiosInstance.get<Room[]>(
      `${API_BASE_URL}/hotels/${hotelId}/rooms`,
      {
        params: { checkInDate, checkOutDate },
      }
    );
    return response.data;
};

export const getAvailableRoomsFromSpecificHotel = async (
  hotelId: number,
  checkInDate: string = "test",
  checkOutDate: string = "test"
): Promise<Room[]> => {
    const response = await axiosInstance.get<Room[]>(
      `${API_BASE_URL}/hotels/${hotelId}/available-rooms`,
      {
        params: { checkInDate, checkOutDate },
      }
    );
    return response.data;
};

export const postRoom = async (
  hotelId: number,
  roomNumber: number,
  cost: number
): Promise<RoomResponse> => {
    const response = await axiosInstance.post<RoomResponse>(
      `${API_BASE_URL}/hotels/${hotelId}/rooms`,
      {
        roomNumber,
        cost,
      }
    );
    return response.data;
};

export const deleteRoom = async (
  hotelId: number,
  roomId: number
): Promise<Room> => {
    const response = await axiosInstance.delete<Room>(
      `${API_BASE_URL}/hotels/${hotelId}/rooms/${roomId}`
    );
    return response.data;
};

export const postPhotoForRoom = async (
  roomId: number,
  url: string
): Promise<Photo> => {
    const response = await axiosInstance.post<Photo>(
      `${API_BASE_URL}/rooms/${roomId}/photos`,
      {
        url,
      }
    );
    return response.data;
};

export const postAmenityForRoom = async (
  roomId: number,
  name: string,
  description: string
): Promise<Amenities> => {
    const response = await axiosInstance.post<Amenities>(
      `${API_BASE_URL}/rooms/${roomId}/amenities`,
      {
        name,
        description,
      }
    );
    return response.data;
};
