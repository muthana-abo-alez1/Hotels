import { axiosInstance } from "apis/ApisConfig";
import { Booking } from "interfaces/Booking";

const API_BASE_URL = "/api/bookings";

export const postBooking = async (
  bookingData: Booking
): Promise<Booking> => {
    const response = await axiosInstance.post<Booking>(`${API_BASE_URL}`, bookingData);
    return response.data;
};
