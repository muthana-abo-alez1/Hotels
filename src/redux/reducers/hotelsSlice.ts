import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hotel } from "interfaces/Hotel";

type HotelsState = {
  hotels: Hotel[];
  idSelectedHotel:number| null;
  selectedHotel: Hotel | null;
};

const initialState: HotelsState = {
  hotels: [],
  idSelectedHotel:null,
  selectedHotel: null,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel: (state, action: PayloadAction<Hotel>) => {
      state.hotels.unshift(action.payload); 
    },
    updateHotel: (state, action: PayloadAction<Hotel>) => {
      const index = state.hotels.findIndex((Hotel) => Hotel.id === action.payload.id);
      if (index !== -1) {
        state.hotels[index] = action.payload;
      }
    },
    removeHotel: (state, action: PayloadAction<number>) => {
      state.hotels = state.hotels.filter((Hotel) => Hotel.id !== action.payload);
    },
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    },
    setSelectedHotel: (state, action: PayloadAction<Hotel | null>) => {
      state.selectedHotel = action.payload;
    },
    setIdSelectedHotel: (state, action: PayloadAction<number | null>) => {
      state.idSelectedHotel = action.payload;; 
    },
  },
});

export const { addHotel, updateHotel, removeHotel, setHotels, setSelectedHotel,setIdSelectedHotel } =
hotelsSlice.actions;

export default hotelsSlice.reducer;
