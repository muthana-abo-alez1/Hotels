import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City } from "interfaces/City";

type CitiesState = {
  cities: City[];
  selectedCity: City | null;
};

const initialState: CitiesState = {
  cities: [],
  selectedCity: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      state.cities.unshift(action.payload); 
    },
    updateCity: (state, action: PayloadAction<City>) => {
      const index = state.cities.findIndex((city) => city.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = action.payload;
      }
    },
    removeCity: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
    setCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<City | null>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { addCity, updateCity, removeCity, setCities, setSelectedCity } =
  citiesSlice.actions;

export default citiesSlice.reducer;
