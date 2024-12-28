import React, { useEffect, useState } from "react";
import { Popover, Typography, Button, Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import { getCities } from "apis/admin/cities/CitiesApis";
import { useDispatch, useSelector } from "react-redux";
import { setCities } from "../../../../../../redux/reducers/citiesSlice";
import { City } from "interfaces/City";

interface LocationPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelectLocation: (city: string) => void;
}

const LocationPopover: React.FC<LocationPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  onSelectLocation,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cities = useSelector((state: any) => state.cities.cities);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  // Fetch cities when component mounts
  useEffect(() => {
    const fetchCities = async () => {
      if (!cities.length) {
        try {
          const fetchedCities = await getCities("", "", 50, 1);
          dispatch(setCities(fetchedCities));
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };
    fetchCities();
  }, [cities.length, dispatch]);

  // Filter cities based on the search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = cities.filter((city: City) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities);
    }
  }, [searchQuery, cities]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ padding: theme.spacing(2), maxWidth: "230px" }}>
        <Typography sx={{ marginBottom: theme.spacing(1), fontWeight: "bold" }}>
          Select a City
        </Typography>
        <TextField
          fullWidth
          placeholder="Search city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ marginBottom: theme.spacing(2) }}
        />
        {filteredCities.length > 0 ? (
          filteredCities.map((city: City) => (
            <Button
              key={city.id}
              onClick={() => {
                onSelectLocation(city.name);
                onClose();
              }}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: theme.spacing(1) }}
            >
              {city.name}
            </Button>
          ))
        ) : (
          <Typography color="textSecondary">No cities found</Typography>
        )}
      </Box>
    </Popover>
  );
};

export default LocationPopover;
