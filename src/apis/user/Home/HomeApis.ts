import { axiosInstance } from "apis/ApisConfig";
import { HomeCities } from "interfaces/HomeCities";
import { HomeRecentlyVisitedHotels } from "interfaces/HomeRecentlyVisitedHotels";
import { HotelSearch } from "interfaces/Hotel";
import { HotelCard } from "interfaces/specificHotel";

const API_BASE_URL = "/api/home";

export const getCitiesHome = async (): Promise<HomeCities[]> => {
  try {
    const response = await axiosInstance.get<HomeCities[]>(
      `${API_BASE_URL}/destinations/trending`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelsRecentlyVisitedHome = async (
  userId: string | null
): Promise<HomeRecentlyVisitedHotels[]> => {
  try {
    const response = await axiosInstance.get<HomeRecentlyVisitedHotels[]>(
      `${API_BASE_URL}/users/${userId}/recent-hotels`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelsFeaturedDeadsHome = async (): Promise<HotelCard[]> => {
  try {
    const response = await axiosInstance.get<HotelCard[]>(
      `${API_BASE_URL}/featured-deals`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

interface SearchParams {
  checkInDate: string;
  checkOutDate: string;
  city: string;
  starRate?: number;
  sort?: string;
  numberOfRooms?: number;
  adults: number;
  children: number;
}

export const searchHotels = async (
  params: SearchParams
): Promise<HotelSearch[]> => {
  try {
    const response = await axiosInstance.get<HotelSearch[]>(
      "/api/home/search",
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
