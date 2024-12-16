import React, { useEffect, useState } from "react";
import FilterSidebar from "pages/User/components/FilterSidebar";
import {
  IconButton,
  Drawer,
  useTheme,
  Container,
  CircularProgress,
} from "@mui/material";
import FilterIcon from "@mui/icons-material/FilterAlt";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import SearchBar from "pages/User/components/SearchBar";
import { HotelSearch } from "interfaces/Hotel";
import SearchCard from "pages/User/components/SearchCard/SearchCard";
import { searchHotels } from "apis/user/Home/HomeApis";

const SearchPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const [hotels, setHotels] = useState<HotelSearch[]>([]);
  const [allHotels, setAllHotels] = useState<HotelSearch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    priceRange: [100, 500] as [number, number],
    starRating: null as number | null,
    hotelType: "",
    selectedAmenities: [] as string[],
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const initialParams = {
    city: searchParams.get("location") || "",
    checkInDate: searchParams.get("checkInDate") || "test",
    checkOutDate: searchParams.get("checkOutDate") || "test",
    adults: parseInt(searchParams.get("adults") || "2"),
    children: parseInt(searchParams.get("children") || "0"),
    numberOfRooms: parseInt(searchParams.get("rooms") || "2"),
    starRate: parseInt(searchParams.get("starRate") || "5"),
    sort: searchParams.get("sort") || "",
  };

  const fetchHotels = async (searchParams: any) => {
    try {
      setLoading(true);
      const data = await searchHotels(searchParams);
      setAllHotels(data);
      setHotels(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(initialParams);
  }, []);

  const handleFilter = (
    priceRange: [number, number],
    starRating: number | null,
    hotelType: string,
    selectedAmenities: string[]
  ) => {
    const filteredHotels = allHotels.filter((hotel) => {
      const discountedPrice = parseInt(
        (hotel.roomPrice * (1 - hotel.discount)).toFixed(2)
      );

      const matchesPrice =
        (hotel.roomPrice >= priceRange[0] &&
          hotel.roomPrice <= priceRange[1]) ||
        (discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1]);

      const matchesRating =
        starRating === null || hotel.starRating === starRating;

      const matchesType =
        !hotelType || hotel.roomType.toLowerCase() === hotelType.toLowerCase();

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) =>
          hotel.amenities.some((hotelAmenity) => hotelAmenity.name === amenity)
        );

      return matchesPrice && matchesRating && matchesType && matchesAmenities;
    });

    setHotels(filteredHotels);
    setFilters({ priceRange, starRating, hotelType, selectedAmenities });
    toggleSidebar();
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSearch = (data: {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    travelers: { adults: number; children: number; rooms: number };
  }) => {
    const updatedParams = {
      city: data.location,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      adults: data.travelers.adults,
      children: data.travelers.children,
      numberOfRooms: data.travelers.rooms,
      starRate: initialParams.starRate,
      sort: initialParams.sort,
    };

    fetchHotels(updatedParams);
  };

  return (
    <div>
      <IconButton
        onClick={() => navigate(-1)}
        edge="start"
        sx={{
          color: "white",
          position: "fixed",
          left: { xs: "20px", sm: "20px", md: "48px" },
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
      <IconButton
        onClick={toggleSidebar}
        edge="start"
        sx={{
          position: "fixed",
          color: "white",
          top: "150px",
          left: { xs: "20px", sm: "20px", md: "48px" },
          zIndex: 1000,
          bgcolor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "#1976d2",
          },
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          marginRight: "1rem",
        }}
      >
        <FilterIcon />
      </IconButton>
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
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: 4,
            gap: 3,
          }}
        >
          <SearchBar
            onSearch={handleSearch}
            initialLocation={initialParams.city}
            initialCheckInDate={initialParams.checkInDate}
            initialCheckOutDate={initialParams.checkOutDate}
            initialRooms={initialParams.numberOfRooms}
            initialChildren={initialParams.children}
            initialAdults={initialParams.adults}
          />
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : hotels.length === 0 ? (
            <p>No hotels found</p>
          ) : (
            hotels.map((hotel) => (
              <SearchCard key={hotel.hotelId} hotel={hotel} />
            ))
          )}
        </Container>
      </Container>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 400,
            maxWidth: "90%",
            height: "100vh",
          },
        }}
      >
        <IconButton
          edge="start"
          onClick={toggleSidebar}
          sx={{
            color: "white",
            position: "absolute",
            right: "20px",
            top: "15px",
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
        <FilterSidebar handleFilter={handleFilter} initialFilters={filters} />
      </Drawer>
    </div>
  );
};

export default SearchPage;
