import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  Container,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import Footer from "pages/User/components/Footer";
import SearchBar from "pages/User/components/SearchBar";
import { getHotelsFromSpecificCity } from "apis/admin/hotels/HotelsApis";
import { Hotel } from "interfaces/Hotel";
import HotelCard from "pages/User/components/HotelCard";

const City = () => {
  const location = useLocation();
  const city = location.state?.city;
  const navigate = useNavigate();
  const theme = useTheme();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (data: {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    travelers: { adults: number; children: number; rooms: number };
  }) => {
    const queryParams = new URLSearchParams({
      location: city.cityName,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      adults: data.travelers.adults.toString(),
      children: data.travelers.children.toString(),
      rooms: data.travelers.rooms.toString(),
    }).toString();

    navigate(`/user/search/data?${queryParams}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const hotels = await getHotelsFromSpecificCity(city.cityId);
        setHotels(hotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", position: "relative" }}>
        <Box
          sx={{
            padding: "4rem 5rem 1rem 3rem",
            backgroundColor: theme.palette.background.default,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            edge="start"
            sx={{
              color: "white",
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: "#1976d2",
              },
              marginRight: "1rem",
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Box sx={{ textAlign: "center", flexGrow: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {city?.cityName}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary.main }}
            >
              {city?.countryName}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "400px",
            position: "relative",
          }}
        >
          <img
            src={city?.thumbnailUrl}
            alt={`${city?.cityName} Thumbnail`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Container
          sx={{
            textAlign: "center",
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchBar onSearch={handleSearch} disabledLocation />
        </Container>

        <Container sx={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "2rem",
              color: theme.palette.primary.main,
            }}
          >
            Hotels in {city?.cityName}
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : hotels.length > 0 ? (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {hotels.map((hotel, index) => (
                <Grid
                  item
                  key={hotel.id || index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <HotelCard
                    hotelName={hotel.name}
                    starRating={hotel.starRating}
                    cityName={city?.cityName}
                    thumbnailUrl={city.thumbnailUrl}
                    description={hotel.description}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "center", marginTop: "2rem" }}
            >
              No hotels available in {city?.cityName}. Please check back later.
            </Typography>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default City;
