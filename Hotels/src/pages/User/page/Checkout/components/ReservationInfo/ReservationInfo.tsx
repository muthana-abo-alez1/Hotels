import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  useTheme,
  CircularProgress,
  Rating,
} from "@mui/material";
import { getHotel } from "apis/admin/hotels/HotelsApis";
import { Room } from "interfaces/Room";
import { specificHotel } from "interfaces/specificHotel";
import React, { useCallback, useEffect, useState } from "react";
import { Bed, BedroomChild } from "@mui/icons-material";

interface ReservationInfoProps {
  handleNext: () => void;
  room: Room;
  hotelId: number;
  numberOfDays: number;
  onTotalPriceChange: (totalPrice: number) => void;
  setHotelName: (hotelName: string) => void;
  checkIn: string;
  checkOut: string;
}

const ReservationInfo: React.FC<ReservationInfoProps> = ({
  handleNext,
  room,
  hotelId,
  numberOfDays,
  onTotalPriceChange,
  setHotelName,
  checkIn,
  checkOut,
}) => {
  const theme = useTheme();
  const [hotelData, setHotelData] = useState<specificHotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const roomPrice = room.price;
  const totalPrice = roomPrice * numberOfDays;
  const tax = totalPrice * 0.1;
  const finalPrice = totalPrice + tax;

  const fetchHotelData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getHotel(hotelId);
      setHotelData(data);
      setHotelName(data.hotelName);
    } catch (error) {
      setError("Error fetching hotel data.");
    } finally {
      setLoading(false);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  useEffect(() => {
    onTotalPriceChange(finalPrice);
  }, [finalPrice, onTotalPriceChange]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }


  return (
    <Paper
      sx={{
        p: { sx: 1, xs: 2, md: 4 },
        maxWidth: 800,
        margin: { sx: "30px 10px", xs: "30px 20px", md: "auto" },
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Reservation Info
      </Typography>

      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mr: 2, width: "100%" }}
          >
            {hotelData?.hotelName || "Hotel Name"}
          </Typography>
          <Rating
            name="hotel-rating"
            value={hotelData?.starRating || 0}
            precision={0.5}
            readOnly
            size="medium"
          />
        </Box>
        <Typography sx={{ mb: 2 }}>
          {hotelData?.location || "City, Country"}
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} >
          <img
            src={room.roomPhotoUrl || "/default-room-image.jpg"}
            alt="Room"
            style={{
              width: "100%",
              borderRadius: "12px",
              border: `1px solid ${theme.palette.divider}`,
              marginTop:"30px",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            {room.roomType}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Capacity :</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Bed sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {room.capacityOfAdults} Adults
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BedroomChild
                  sx={{ mr: 1, color: theme.palette.primary.main }}
                />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {room.capacityOfChildren} Children
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Check-In</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {checkIn}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Check-Out</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {checkOut}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Price per Night</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                ${roomPrice}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">
                Total for {numberOfDays} Days
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                ${totalPrice}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Tax (10%)</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                ${tax.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Total Price</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                ${finalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            width: "100%",
            maxWidth: "200px",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default ReservationInfo;
