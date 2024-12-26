import { Hotel } from "./Hotel";

export interface City {
    id: number;
    name: string;
    description: string;
    hotels: Hotel[];
}