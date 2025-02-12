import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./reducers/citiesSlice";
import hotelsReducer from "./reducers/hotelsSlice";
import roomsReducer from "./reducers/roomsSlice";
import homeCitiesReducer  from "./reducers/homeCitiesSlice"

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    hotels: hotelsReducer,
    rooms: roomsReducer,
    homeCities:homeCitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;