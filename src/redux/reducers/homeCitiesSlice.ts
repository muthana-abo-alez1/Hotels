import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeCities } from "interfaces/HomeCities";

type HomeCitiesState = {
  homeCities: HomeCities[];
  selectedCity: HomeCities | null;
};

const initialState: HomeCitiesState = {
  homeCities: [],
  selectedCity: null,
};

const homeCitiesSlice = createSlice({
  name: "HomeCities",
  initialState,
  reducers: {
    setHomeCities: (state, action: PayloadAction<HomeCities[]>) => {
      state.homeCities = action.payload;
    },
    setSelectedHomeCity: (state, action: PayloadAction<HomeCities | null>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const {setHomeCities, setSelectedHomeCity } =
homeCitiesSlice.actions;

export default homeCitiesSlice.reducer;