import React from "react";
import { useTheme, Box, Typography } from "@mui/material";
import Section from "../Section";
import DarkPhoto from "../../../../assets/images/DarkHomeImg.png";
import LightPhoto from "../../../../assets/images/LightHomeImg.png";
import SearchBar from "../SearchBar";
import { searchHotels } from "apis/user/Home/HomeApis";
import { useNavigate } from "react-router-dom";

const HomeSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const backgroundImage =
    theme.palette.mode === "dark" ? DarkPhoto : LightPhoto;

  const fetchHotels = async (data: {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    travelers: { adults: number; children: number; rooms: number };
  }) => {
    const { location, checkInDate, checkOutDate, travelers } = data;

    const searchParams = {
      checkInDate,
      checkOutDate,
      city: location,
      starRate: 5,
      numberOfRooms: travelers.rooms,
      adults: travelers.adults,
      children: travelers.children,
    };

    try {
      const response = await searchHotels(searchParams);
      //console.log("Search Results:", response);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleSearch = (data: {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    travelers: { adults: number; children: number; rooms: number };
  }) => {
    const queryParams = new URLSearchParams({
      location: data.location,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      adults: data.travelers.adults.toString(),
      children: data.travelers.children.toString(),
      rooms: data.travelers.rooms.toString(),
    }).toString();

    navigate(`/user/search/data?${queryParams}`);
  };

  return (
    <Section height="auto" minHeight="100vh">
      <img
        src={backgroundImage}
        alt="Background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
            lg: "flex-start",
          },
          alignItems: {
            xs: "center",
            sm: "center",
            md: "flex-start",
            lg: "flex-start",
          },
          flexDirection: "column",
          color: theme.palette.text.primary,
          width: { xs: "95%", sm: "90%", md: "85%", lg: "70%" },
          textAlign: { xs: "center", sm: "center", md: "left", lg: "left" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "2rem", md: "3rem", lg: "3.8rem" },
            fontWeight: "bold",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          Find an apartment for <br />
          your vacation
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
            fontWeight: 400,
          }}
        >
          We have several thousand apartments <br />
          for every taste in every corner of the globe
        </Typography>

        <Box
          sx={{
            marginTop: "20px",
            padding: { xs: "10px", sm: "10px", md: "20px", lg: "30px" },
            background:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            height: "max",
            width: "max-content",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1rem", sm: "2rem", md: "2.8rem" },
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            FIND
          </Typography>
          <SearchBar onSearch={handleSearch} />
        </Box>
      </Box>
    </Section>
  );
};

export default HomeSection;
