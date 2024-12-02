import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "interfaces/Room";

type RoomsState = {
  rooms: Room[];
  filteredRooms: Room[];
  selectedRoom: Room | null;
};

const initialState: RoomsState = {
  rooms: [],
  filteredRooms: [],
  selectedRoom: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.unshift(action.payload); 
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      const index = state.rooms.findIndex((room) => room.roomId === action.payload.roomId);
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    },
    setFilteredRooms(state, action: PayloadAction<Room[]>) {
      state.filteredRooms = action.payload; 
    },
    removeRoom: (state, action: PayloadAction<number>) => {
      state.rooms = state.rooms.filter((room) => room.roomId !== action.payload);
    },
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload; 
    },
    setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
      state.selectedRoom = action.payload; 
    },
  },
});

export const { addRoom, updateRoom,setFilteredRooms, removeRoom, setRooms, setSelectedRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
