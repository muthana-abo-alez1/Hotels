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