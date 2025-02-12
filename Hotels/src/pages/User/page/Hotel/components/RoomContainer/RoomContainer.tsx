import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import RoomCard from "pages/User/components/RoomCard";
import RoomFilterToggle from "../RoomFilterToggle";
import { Room } from "interfaces/Room";
import {
  getAvailableRoomsFromSpecificHotel,
  getRoomsFromSpecificHotel,
} from "apis/admin/rooms/RoomsApis";
import SearchBar from "pages/User/components/SearchBar";
import dayjs from "dayjs";
import { calculateDaysBetweenDates } from "utils/DateUtils";

interface RoomContainerProps {
  id: number;
  checkInData: string;
  checkOutData: string;
}

const RoomContainer: React.FC<RoomContainerProps> = ({
  id,
  checkInData,
  checkOutData,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [numberOfDays, setNumberOfDays] = useState<number>(1);
  const [checkInDate, setCheckInDate] = useState<string>(
    checkInData || dayjs().format("YYYY-MM-DD")
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    checkOutData || dayjs().add(1, "day").format("YYYY-MM-DD")
  );

  const fetchRooms = async () => {
    setLoading(true);
    try {
      let fetchedRooms: Room[] = [];
      if (!id) return;
      if (filter === "all") {
        fetchedRooms = await getRoomsFromSpecificHotel(id);
      } else {
        fetchedRooms = await getAvailableRoomsFromSpecificHotel(id);
      }
      setRooms(fetchedRooms);
    } catch (error) {
      console.error(`Failed to fetch ${filter} rooms:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [filter]);


const handleSearch = async (data: {
  location: string;
  checkInDate: string;
  checkOutDate: string;
  travelers: { adults: number; children: number; rooms: number };
}) => {
  const updatedHotelId = id;
  const { checkInDate, checkOutDate } = data;
  setCheckInDate(checkInDate);
  setCheckOutDate(checkOutDate);
  setNumberOfDays(calculateDaysBetweenDates(checkInDate, checkOutDate));
  try {
    setLoading(true);
    const fetchedRooms = await getAvailableRoomsFromSpecificHotel(
      updatedHotelId,
      checkInDate,
      checkOutDate
    );
    setRooms(fetchedRooms);
  } catch (error) {
    console.error(`Failed to fetch available rooms:`, error);
  } finally {
    setLoading(false);
  }
};


  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 4 }}>
        Rooms
      </Typography>

      <RoomFilterToggle onFilterChange={(newFilter) => setFilter(newFilter)} />
      <Box
        sx={{
          maxWidth: "400px",
          width: "100%",
          margin: "auto",
          mb: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {filter !== "all" ? (
          <SearchBar
            onSearch={handleSearch}
            disabledLocation
            disabledAdults
            initialCheckInDate={checkInData}
            initialCheckOutDate={checkOutData}
          />
        ) : null}
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {rooms.map((room) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              lg={4}
              key={room.roomId}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: 300, md: 378 },
              }}
            >
              <RoomCard
                room={room}
                reservationInfo={{
                  hotelId: id,
                  numberOfDays,
                  checkIn: checkInDate,
                  checkOut: checkOutDate,
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RoomContainer;
