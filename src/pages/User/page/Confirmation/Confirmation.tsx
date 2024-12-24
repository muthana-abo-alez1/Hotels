import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Avatar } from "@mui/material";
import Confetti from "react-dom-confetti";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [confettiActive, setConfettiActive] = useState(false);

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 4000,
    zIndex: 1000,
    stagger: 3,
    width: "15px",
    height: "15px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const { bookingDetails, message } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "green",
        }}
      >
        {message || "Booking Confirmation"}
      </Typography>
      <Confetti active={confettiActive} config={confettiConfig} />

      {bookingDetails && (
        <Box sx={{ mt: 2 }}>
          <Avatar
            src={bookingDetails.img}
            alt={bookingDetails.roomNumber}
            sx={{
              width: 300,
              height: 200,
              borderRadius: "8px",
              boxShadow: 3,
            }}
          />
          <Typography variant="h6" sx={{ mt: 4 }}>
            Hotel Name: {bookingDetails.hotelName}
          </Typography>
          <Typography variant="h6">
            Room Number: {bookingDetails.roomNumber}
          </Typography>
          <Typography variant="h6">
            Total Cost: ${bookingDetails.totalCost}
          </Typography>
          <Typography variant="h6">
            Check-In: {bookingDetails.checkIn}
          </Typography>
          <Typography variant="h6">
            Check-Out: {bookingDetails.checkOut}
          </Typography>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4  ,color:"white"}}
        onClick={() => navigate("/user/home")}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default Confirmation;
