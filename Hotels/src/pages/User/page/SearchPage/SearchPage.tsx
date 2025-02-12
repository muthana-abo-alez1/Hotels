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
import SortIcon from "@mui/icons-material/Sort";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";
import SearchBar from "pages/User/components/SearchBar";
import { HotelSearch } from "interfaces/Hotel";
import SearchCard from "pages/User/components/SearchCard/SearchCard";
import { searchHotels } from "apis/user/Home/HomeApis";
import dayjs from "dayjs";
import SortSidebar from "./component/SortSidebar";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState<"left" | "right">(
    "left"
  );
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

  const [checkInDate, setCheckInDate] = useState<string>(
    initialParams.checkInDate || dayjs().format("YYYY-MM-DD")
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    initialParams.checkOutDate || dayjs().add(1, "day").format("YYYY-MM-DD")
  );
  const [page, setPage] = useState(1);
  const fetchHotels = async (searchParams: any, page: number) => {
    try {
      setLoading(true);
      const data = await searchHotels({ ...searchParams, page });
      setAllHotels((prev) => [...prev, ...data]); 
      setHotels((prev) => [...prev, ...data]); 
    } catch (err: any) {
      setError(err.message || "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(initialParams, page);
  }, [page]);

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
    const { checkInDate, checkOutDate } = data;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
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

    fetchHotels(updatedParams, page);
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
        onClick={() => {
          toggleSidebar();
          setSidebarPosition("left");
        }}
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
      <IconButton
        onClick={() => {
          toggleSidebar();
          setSidebarPosition("right");
        }}
        edge="start"
        sx={{
          position: "fixed",
          color: "white",
          top: "150px",
          right: { xs: "10px", sm: "10px", md: "38px" },
          zIndex: 1000,
          bgcolor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "#1976d2",
          },
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          marginLeft: "2rem",
        }}
      >
        <SortIcon />
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
            <InfiniteScroll
              dataLength={hotels.length}
              next={() => setPage(page + 1)}
              hasMore={hotels.length < allHotels.length}
              loader={
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
              }
              endMessage={<p>No more hotels to load</p>}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {hotels.map((hotel) => (
                  <SearchCard
                    key={hotel.hotelId}
                    hotel={hotel}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </Container>
      </Container>
      <Drawer
        anchor={sidebarPosition}
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
            [sidebarPosition === "left" ? "right" : "left"]: "20px",
            top: "15px",
            zIndex: 1000,
            bgcolor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: "#1976d2",
            },
            [sidebarPosition === "left" ? "marginRight" : "marginLeft"]: "10px",
          }}
        >
          {sidebarPosition === "left" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
        {sidebarPosition === "left" ? (
          <FilterSidebar handleFilter={handleFilter} initialFilters={filters} />
        ) : (
          <SortSidebar
            hotels={hotels}
            setHotels={setHotels}
            setLoading={setLoading}
            toggleSidebar={toggleSidebar}
          />
        )}
      </Drawer>
    </div>
  );
};

export default SearchPage;
