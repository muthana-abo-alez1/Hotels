import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import RoomCard from "pages/User/components/RoomCard";
import RoomFilterToggle from "../RoomFilterToggle";
import { Room } from "interfaces/Room";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvailableRoomsFromSpecificHotel,
  getRoomsFromSpecificHotel,
} from "apis/admin/rooms/RoomsApis";

interface RoomContainerProps {
  id: number | null;
}

const RoomContainer: React.FC<RoomContainerProps> = ({ id }) => {
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>([]);


  const fetchRooms = async () => {
    setLoading(true);
    try {
      let fetchedRooms: Room[];
      if (!id) return;
      if (filter === "all") {
        fetchedRooms = await getRoomsFromSpecificHotel(id);
        setRooms(fetchedRooms)
      } else {
        fetchedRooms = await getAvailableRoomsFromSpecificHotel(id);
        setRooms(fetchedRooms)
      }
    } catch (error) {
      console.error(`Failed to fetch ${filter} rooms:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [filter]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 4 }}>
        Rooms
      </Typography>

      <RoomFilterToggle onFilterChange={(newFilter) => setFilter(newFilter)} />

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
              <RoomCard room={room} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RoomContainer;
