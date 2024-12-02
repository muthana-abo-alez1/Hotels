import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRooms, setFilteredRooms, setSelectedRoom, removeRoom } from "../../../../redux/reducers/roomsSlice";
import TablePage from "pages/Admin/components/TablePage";
import RightSidebar from "pages/Admin/components/Sidebar/RightSidebar";
import { debounce } from "lodash";
import { showErrorSnackbar, showSuccessSnackbar } from "utils/snackbarUtils";
import RoomsForm from "./component/RoomsForm";
import { deleteRoom, getRoomsFromSpecificHotel } from "apis/admin/rooms/RoomsApis";
import { Hotel } from "interfaces/Hotel";
import { Room } from "interfaces/Room";
import HotelSelectionDialog from "./component/HotelSelectionDialog";

const RoomsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isSelectedRoom, setIsSelectedRoom] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const rooms = useSelector((state: any) => state.rooms.rooms);
  const filteredRooms = useSelector((state: any) => state.rooms.filteredRooms); 

  const fetchRooms = useCallback(
    async () => {
      if (selectedHotel) {
        setLoading(true);  
        try {
          const rooms = await getRoomsFromSpecificHotel(selectedHotel.id);
          dispatch(setRooms(rooms));
        } catch (error) {
          console.error("Error fetching rooms:", error);
          showErrorSnackbar("Error", "Failed to fetch rooms.");
        } finally {
          setLoading(false);  
        }
      }
    },
    [dispatch, selectedHotel]
  );

  const fetchRoomsDebounced = useRef(
    debounce(() => {
      if (selectedHotel) {
        fetchRooms();
      }
    }, 300)
  ).current;

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchRoomsDebounced();
  };

  useEffect(() => {
    if (selectedHotel) {
      fetchRooms();
    }
  }, [selectedHotel, fetchRooms]);

  useEffect(() => {
    if (searchValue === "") {
      dispatch(setFilteredRooms(rooms)); 
    } else {
      const filteredData = rooms.filter((room: Room) => {
        const roomNumberStr = room.roomNumber.toString();
        const searchQuery = searchValue.toLowerCase();
        return (
          roomNumberStr.includes(searchQuery) || 
          room.roomType.toLowerCase().includes(searchQuery) ||
          room.capacityOfAdults.toString().includes(searchQuery) || 
          room.capacityOfChildren.toString().includes(searchQuery) ||
          room.price.toString().includes(searchQuery) || 
          room.availability.toString().includes(searchQuery) 
        );
      });
  
      dispatch(setFilteredRooms(filteredData)); 
    }
  }, [searchValue, rooms, dispatch]);
  

  const handleAddRoom = () => {
    setIsSelectedRoom(false);
    setRightSidebarOpen(true);
  };

  const handleEditRoom = (room: any) => {
    dispatch(setSelectedRoom(room));
    setRightSidebarOpen(true);
    setIsSelectedRoom(true);
  };

  const handleDeleteRoom = async (roomId: any) => {
    try {
      if (selectedHotel) {
        await deleteRoom(selectedHotel.id, roomId.roomId);
        dispatch(removeRoom(roomId.roomId));
        showSuccessSnackbar("Item deleted", "The item has been successfully deleted.");
      } else {
        showErrorSnackbar(
          "Deletion Failed",
          "No hotel is selected. Please select a hotel to delete a room."
        );
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      showErrorSnackbar("Error", "Failed to delete room.");
    }
  };

  const columns = [
    { id: "roomId", label: "ID" },
    { id: "roomNumber", label: "Room Number" },
    { id: "roomType", label: "Room Type" },
    { id: "capacityOfAdults", label: "Capacity Of Adults" },
    { id: "capacityOfChildren", label: "Capacity Of Children" },
    { id: "price", label: "Price" },
    { id: "availability", label: "Availability" },
  ];

  const handleDialogClose = (selectedHotel: Hotel | null) => {
    setSelectedHotel(selectedHotel);
    setDialogOpen(false);
  };

  return (
    <>
      <HotelSelectionDialog
        open={dialogOpen}
        onClose={handleDialogClose}
      />
      <TablePage
        title="Rooms"
        data={filteredRooms} 
        onAddNewItem={handleAddRoom}
        columns={columns}
        onEditItem={handleEditRoom}
        onDeleteItem={handleDeleteRoom}
        searchValue={searchValue}
        handleSearch={handleSearch}
        loading={loading} 
      />
      <RightSidebar
        open={rightSidebarOpen}
        onClick={() => setRightSidebarOpen(false)}
      >
        <RoomsForm
          onClose={() => {
            setRightSidebarOpen(false);
            setIsSelectedRoom(false);
          }} 
          hotelId={selectedHotel}
          isSelectedRoom={isSelectedRoom}
        />
      </RightSidebar>
    </>
  );
};

export default RoomsPage;
