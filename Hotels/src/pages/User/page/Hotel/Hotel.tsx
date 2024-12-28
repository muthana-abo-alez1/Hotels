import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Divider,
  IconButton,
  useTheme,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HotelCarousel from "./components/HotelCarousel";
import HotelDetails from "./components/HotelDetails";
import HotelMap from "./components/HotelMap";
import SearchBar from "pages/User/components/SearchBar";
import ReviewContainer from "./components/Review/ReviewContainer";
import RoomContainer from "./components/RoomContainer";
import Footer from "pages/User/components/Footer";
import { getHotel } from "apis/admin/hotels/HotelsApis";
import { specificHotel } from "interfaces/specificHotel";
import { useLocation } from "react-router-dom";

const Hotel = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [hotelId, setHotelId] = useState<number>(1); 
  const location = useLocation();
  const [hotelData, setHotelData] = useState<specificHotel | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const searchParams = new URLSearchParams(location.search);

  const initialParams = {
    id: searchParams.get("id") || "",
    checkInDate: searchParams.get("checkInDate") || "test",
    checkOutDate: searchParams.get("checkOutDate") || "test",
  };
  useEffect(() => {
    const encodedId = initialParams.id; 
    if (encodedId) {
      try {
        const decodedId = decodeHotelId(encodedId); 
        setHotelId(decodedId);
      } catch (error) {
        setError("Invalid hotel ID.");
      }
    }
  }, [location]);

  const decodeHotelId = (encodedId: string) => {
    try {
      const decodedId = atob(encodedId); 
      return parseInt(decodedId, 10); 
    } catch (error) {
      throw new Error("Failed to decode hotel ID.");
    }
  };

  const fetchHotelData = useCallback(async () => {
    if (hotelId === null) return; 

    setLoading(true);
    try {
      const data = await getHotel(hotelId);
      setHotelData(data);
    } catch (error) {
      setError("Error fetching hotel data.");
    } finally {
      setLoading(false);
    }
  }, [hotelId]); 

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);


  if (loading) {
    return (
      <Backdrop
        sx={{
          color: theme.palette.primary.main,
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.default,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 4,
          marginTop: 5,
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          edge="start"
          sx={{
            color: "white",
            position: "absolute",
            left: "48px",
            top: "93px",
            zIndex: 1000,
            bgcolor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: "#1976d2",
            },
            marginRight: "1rem",
          }}
        >
          <ChevronLeft />
        </IconButton>

        {hotelData && (
          <>
            <HotelCarousel hotelId={hotelId} />
            <Divider
              sx={{
                borderColor: "rgba(0, 0, 0, 0.1)",
                marginY: 2,
                width: "100%",
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ flex: 1, minWidth: "300px" }}>
                <HotelDetails hotelData={hotelData} />
              </Box>
              <Box sx={{ flex: 1, minWidth: "300px" }}>
                <HotelMap
                  latitude={hotelData.latitude}
                  longitude={hotelData.longitude}
                />
              </Box>
            </Box>
            <Divider
              sx={{
                borderColor: "rgba(0, 0, 0, 0.1)",
                marginY: 2,
                width: "100%",
              }}
            />
            <RoomContainer id={hotelId} checkInData={initialParams.checkInDate} checkOutData={initialParams.checkOutDate}/>
            <Divider
              sx={{
                borderColor: "rgba(0, 0, 0, 0.1)",
                marginY: 2,
                width: "100%",
              }}
            />
            <ReviewContainer id={hotelId} />
          </>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default Hotel;
