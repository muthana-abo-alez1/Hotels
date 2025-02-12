import { Amenities } from "./amenities";

export interface specificHotel {
  hotelName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: Amenities[];
  starRating: number;
  availableRooms: number;
  imageUrl: string;
  cityId: number;
}

export interface HotelCard {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}