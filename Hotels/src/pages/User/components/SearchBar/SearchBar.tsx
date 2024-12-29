import React, { useState } from "react";
import { Box, TextField, IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { Dayjs } from "dayjs";
import LocationPopover from "./Popover/LocationPopover";
import TravelersPopover from "./Popover/TravelersPopover";
import DateCalendarPopover from "./Popover/DateCalendarPopover";
import { calculateDaysBetweenDates } from "utils/DateUtils";
import { showInfoSnackbar } from "utils/snackbarUtils";

interface SearchBarProps {
  onSearch: (data: {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    travelers: { adults: number; children: number; rooms: number };
  }) => void;
  disabledLocation?: boolean;
  initialLocation?: string;
  initialCheckInDate?: string;
  initialCheckOutDate?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialRooms?: number;
  disabledAdults?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  disabledLocation = false,
  initialLocation = "",
  initialCheckInDate = dayjs().format("YYYY-MM-DD"),
  initialCheckOutDate = dayjs().add(1, "day").format("YYYY-MM-DD"),
  initialAdults = 2,
  initialChildren = 0,
  initialRooms = 1,
  disabledAdults = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverType, setPopoverType] = useState<
    "location" | "travelers" | "checkIn" | "checkOut" | null
  >(null);
  const [location, setLocation] = useState(initialLocation);
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(
    dayjs(initialCheckInDate)
  );
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(
    dayjs(initialCheckOutDate)
  );
  const theme = useTheme();
  const [travelers, setTravelers] = useState({
    adults: initialAdults,
    children: initialChildren,
    rooms: initialRooms,
  });

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    type: "location" | "travelers" | "checkIn" | "checkOut"
  ) => {
    setAnchorEl(event.currentTarget);
    setPopoverType(type);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverType(null);
  };

  const handleSearch = () => {
    
    const searchData = {
      location,
      checkInDate: checkInDate ? checkInDate.format("YYYY-MM-DD") : "",
      checkOutDate: checkOutDate ? checkOutDate.format("YYYY-MM-DD") : "",
      travelers: {
        adults: travelers.adults,
        children: travelers.children,
        rooms: travelers.rooms,
      },
    };
    if(calculateDaysBetweenDates(searchData.checkInDate,searchData.checkOutDate)<0){
      showInfoSnackbar("Invalid dates", "Check-out date must be later than check-in date.");
      return
    }
    onSearch(searchData);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.paper,
          padding: { xs: "10px", sm: "10px", md: "10px 20px" },
          borderRadius: "8px",
          border: `solid 3px ${theme.palette.primary.main}`,
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          width: { xs: "300px", sm: "300px", md: "100%", lg: "100%" },
        }}
      >
        {!disabledLocation && (
          <Box
            sx={{
              flex: 1,
              borderRight: {xs: 'none',md: `solid 2px ${theme.palette.primary.main}`, },
              width: { xs: "100%", sm: "100%", md: "calc(33% - 10px)" },
              marginBottom: { xs: "10px", sm: "0" },
              minWidth: "210px",
              paddingLeft: "10px",
              display: "flex",
            }}
          >
            <TextField
              label="Location"
              value={location}
              placeholder="Which city do you prefer?"
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                },
              }}
              fullWidth
              onClick={(e) => handlePopoverOpen(e, "location")}
            />
          </Box>
        )}
        <Box
          sx={{
            flex: 1,
            borderRight: {xs: 'none',md: `solid 2px ${theme.palette.primary.main}`, },
            width: { xs: "100%", sm: "100%", md: "calc(33% - 10px)" },
            marginBottom: { xs: "10px", sm: "0" },
            paddingLeft: "10px",
            minWidth: "150px",
          }}
        >
          <TextField
            label="Check-In Date"
            value={checkInDate ? checkInDate.format("DD/MM/YYYY") : ""}
            placeholder="Select check-in date"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "1.3rem",
                fontWeight: "bold",
              },
            }}
            fullWidth
            onClick={(e) => handlePopoverOpen(e, "checkIn")}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            paddingLeft: "10px",
            width: { xs: "100%", sm: "100%", md: "calc(33% - 10px)" },
            marginBottom: { xs: "10px", sm: "0" },
            borderRight: disabledAdults ? "none" : {xs: 'none',md: `solid 2px ${theme.palette.primary.main}`, },
            minWidth: "150px",
          }}
        >
          <TextField
            label="Check-Out Date"
            value={checkOutDate ? checkOutDate.format("DD/MM/YYYY") : ""}
            placeholder="Select check-out date"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "1.3rem",
                fontWeight: "bold",
              },
            }}
            fullWidth
            onClick={(e) => handlePopoverOpen(e, "checkOut")}
          />
        </Box>
        {!disabledAdults && (
          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", sm: "100%", md: "calc(33% - 10px)" },
              marginBottom: "0",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <TextField
              label="Travelers"
              placeholder="Select travelers"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                inputComponent: () => (
                  <Box
                    sx={{
                      whiteSpace: "pre-wrap",
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      minWidth: "150px",
                      textAlign: "start",
                    }}
                  >
                    {`${travelers.adults} Adults, ${travelers.children} Children\n${travelers.rooms} Room`}
                  </Box>
                ),
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                },
              }}
              fullWidth
              onClick={(e) => handlePopoverOpen(e, "travelers")}
            />
          </Box>
        )}
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "12px",
            borderRadius: "50%",
            color: "white",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          }}
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <LocationPopover
        open={popoverType === "location"}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        onSelectLocation={setLocation}
      />
      <DateCalendarPopover
        open={popoverType === "checkIn"}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        selectedDate={checkInDate}
        onDateChange={setCheckInDate}
      />
      <DateCalendarPopover
        open={popoverType === "checkOut"}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        selectedDate={checkOutDate}
        onDateChange={setCheckOutDate}
      />
      <TravelersPopover
        open={popoverType === "travelers"}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        travelers={travelers}
        onTravelerChange={(type, operation) =>
          setTravelers((prev) => ({
            ...prev,
            [type]: Math.max(
              type === "rooms" ? 1 : 0,
              operation === "increment" ? prev[type] + 1 : prev[type] - 1
            ),
          }))
        }
      />
    </Box>
  );
};

export default SearchBar;
