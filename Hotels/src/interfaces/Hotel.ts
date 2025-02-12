import { Amenities } from "./amenities";

export interface Hotel {
    id: number;
    name: string;
    description: string;
    hotelType: number;
    starRating: number;
    latitude: number;
    longitude: number;
}
export type HotelPayload = Omit<Hotel, "id">; 

export interface HotelSearch{
    hotelId: number;
    hotelName: string;
    starRating: number;
    latitude: number;
    longitude: number;
    roomPrice: number;
    roomType: string;
    cityName:string;
    roomPhotoUrl:string;
    discount: number;
    amenities: Amenities[];
}