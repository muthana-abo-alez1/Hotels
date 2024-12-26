import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Slider,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import StarRatingFilter from "pages/User/page/SearchPage/component/StarRatingFilter";
import { RoomType } from "types/RoomType";
import { SelectChangeEvent } from "@mui/material/Select";
import AmenitySelector from "../Amenities/AmenitySelector";

const FilterSidebar: React.FC<{
  handleFilter: (
    priceRange: [number, number],
    starRating: number | null,
    hotelType: string,
    selectedAmenities: string[]
  ) => void;
  initialFilters: {
    priceRange: [number, number];
    starRating: number | null;
    hotelType: string;
    selectedAmenities: string[];
  };
}> = ({ handleFilter,initialFilters  }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange);
  const [starRating, setStarRating] = useState<number | null>(initialFilters.starRating);
  const [hotelType, setHotelType] = useState<RoomType | "">(initialFilters.hotelType as RoomType);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialFilters.selectedAmenities);
  const [resetFilters, setResetFilters] = useState<boolean>(false);
  const [resetAmenities, setResetAmenities] = useState<boolean>(false);
  const theme = useTheme();

  const handleAmenityChange = (updatedAmenities: string[]) => {
    setSelectedAmenities(updatedAmenities);
  };

  const handleSliderChange = (event: Event, newValue: [number, number]) => {
    setPriceRange(newValue);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = Math.min(Math.max(Number(event.target.value), 0), 1000);
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange as [number, number]);
  };

  const handleReset = () => {
    setPriceRange([100, 500]);
    setStarRating(null);
    setHotelType("");
    setSelectedAmenities([]);
    setResetFilters(true);
    setResetAmenities(true);
    setTimeout(() => {
      setResetFilters(false);
      setResetAmenities(false);
    }, 0);
  };

  const handleApplyFilter = () => {
    handleFilter(priceRange, starRating, hotelType, selectedAmenities);
  };

  useEffect(() => {
    setPriceRange(initialFilters.priceRange);
    setStarRating(initialFilters.starRating);
    setHotelType(initialFilters.hotelType as RoomType);
    setSelectedAmenities(initialFilters.selectedAmenities);
  }, [initialFilters]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "max-content",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        overflow: "hidden",
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Price Range
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2, marginBottom: 2 }}>
          <TextField
            label="Min Price"
            variant="outlined"
            type="number"
            value={priceRange[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, 0)
            }
            sx={{ flex: 1 }}
            inputProps={{ min: 0, max: priceRange[1] }}
          />
          <TextField
            label="Max Price"
            variant="outlined"
            type="number"
            value={priceRange[1]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, 1)
            }
            sx={{ flex: 1 }}
            inputProps={{ min: priceRange[0], max: 1000 }}
          />
        </Box>
        <Slider
          value={priceRange}
          onChange={(_, newValue) =>
            handleSliderChange(_, newValue as [number, number])
          }
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>

      <StarRatingFilter
        value={starRating}
        onChange={(value) => setStarRating(value)}
        reset={resetFilters}
      />

      <Box>
        <Typography variant="h6" gutterBottom>
          Room Type
        </Typography>
        <FormControl fullWidth>
          <Select
            value={hotelType}
            onChange={(e: SelectChangeEvent<RoomType>) =>
              setHotelType(e.target.value as RoomType)
            }
            displayEmpty
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Standard">Standard</MenuItem>
            <MenuItem value="Double">Double</MenuItem>
            <MenuItem value="King Suite">King Suite</MenuItem>
            <MenuItem value="Cabin">Cabin</MenuItem>
            <MenuItem value="Ocean View">Ocean View</MenuItem>
            <MenuItem value="Suite">Suite</MenuItem>
            <MenuItem value="Deluxe">Deluxe</MenuItem>
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Family Suite">Family Suite</MenuItem>
            <MenuItem value="Executive Suite">Executive Suite</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <AmenitySelector
        selectedAmenities={selectedAmenities}
        onAmenitiesChange={handleAmenityChange}
        reset={resetAmenities}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          marginTop: "auto",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          sx={{ flex: 1 }}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ flex: 1 ,color:"white"}}
          onClick={handleApplyFilter}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
