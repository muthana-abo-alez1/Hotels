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
