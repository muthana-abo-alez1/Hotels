import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TablePage from "pages/Admin/components/TablePage";
import RightSidebar from "pages/Admin/components/Sidebar/RightSidebar";
import { debounce } from "lodash";
import {  showSuccessSnackbar } from "utils/snackbarUtils";
import { getHotels } from "apis/admin/hotels/HotelsApis";
import { removeHotel, setHotels, setSelectedHotel } from "../../../../redux/reducers/hotelsSlice";
import HotelsForm from "./component/HotelsForm";

const HotelsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isSelectedHotel, setIsSelectedHotel] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false); 

  const hotels = useSelector((state: any) => state.hotels.hotels);

  const fetchHotels = useCallback(
    async (searchTerm: string, pageNumber: number, pageSize: number) => {
      setLoading(true);  
      try {
        const hotels = await getHotels("", searchTerm, 50, pageNumber);
        dispatch(setHotels(hotels));
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);  
      }
    },
    [dispatch]
  );

  const fetchHotelsDebounced = useRef(
    debounce((searchTerm: string, pageNumber: number, pageSize: number) => {
      fetchHotels(searchTerm, pageNumber, pageSize);
    }, 300)
  ).current;

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchHotelsDebounced(value, 1, 10); 
  };

  useEffect(() => {
    if (searchValue === "") {
      fetchHotels("", 1, 10);
    } else {
      fetchHotelsDebounced(searchValue, 1, 10);
    }
  }, [searchValue, fetchHotelsDebounced]);

  const handleAddHotel = () => {
    setIsSelectedHotel(false);
    setRightSidebarOpen(true);
  };

  const handleEditHotel = (hotel: any) => {
    dispatch(setSelectedHotel(hotel));
    setRightSidebarOpen(true);
    setIsSelectedHotel(true);
  };

  const handleDeleteHotel = async (hotel: any) => { 
    try {
      dispatch(removeHotel(hotel.id));
      showSuccessSnackbar("Item deleted", "The item has been successfully deleted.");
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "hotelType", label: "HotelType" },
    { id: "starRating", label: "StarRating" },
    { id: "latitude", label: "Latitude" },
    { id: "longitude", label: "Longitude" },
  ];

  return (
    <>
      <TablePage
        title="Hotels"
        data={hotels}
        onAddNewItem={handleAddHotel}
        columns={columns}
        onEditItem={handleEditHotel}
        onDeleteItem={handleDeleteHotel}
        searchValue={searchValue}
        handleSearch={handleSearch} 
        loading={loading}  
      />
      <RightSidebar open={rightSidebarOpen} onClick={() => setRightSidebarOpen(false)}>
        <HotelsForm onClose={() => {
          setRightSidebarOpen(false);
          setIsSelectedHotel(false);
        }} isSelectedHotel={isSelectedHotel} />
      </RightSidebar>
    </>
  );
};

export default HotelsPage;
