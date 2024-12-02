import { Amenities } from "./amenities";


export interface Room {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl?: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities?: Amenities[];
  price: number;
  availability: boolean;
}
export interface RoomResponse {
    id: number;
    roomNumber: string;
    cost: number;
}