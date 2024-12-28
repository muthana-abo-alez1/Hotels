import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  Chip,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

const amenitiesList: string[] = [
  "Free Wi-Fi",
  "Fitness Center",
  "wifi",
  "Swimming Pool",
  "Free Breakfast",
  "TV",
  "Business Center Access",
  "Meeting Room",
  "Complimentary Breakfast",
  "Adjoining Rooms",
  "Private Balcony",
  "Kitchenette",
  "Play Area",
  "Budget-Friendly",
  "Single Bed",
  "King Size Bed",
  "City View",
  "Room Service",
  "Spa Services",
  "Fireplace",
  "Jacuzzi",
  "Mini Bar",
  "Hiking Trails",
  "Ocean View",
  "Ocean View Balcony",
];

interface AmenitySelectorProps {
  selectedAmenities: string[]; 
  onAmenitiesChange: (amenities: string[]) => void;
  reset: boolean;
}

export default function AmenitySelector({
  selectedAmenities,
  onAmenitiesChange,
  reset,
}: AmenitySelectorProps) {
  const [amenities, setAmenities] = useState<string[]>(selectedAmenities);

  useEffect(() => {
    setAmenities(selectedAmenities);
  }, [selectedAmenities]);

  useEffect(() => {
    if (reset) {
      setAmenities([]);
      onAmenitiesChange([]);
    }
  }, [reset, onAmenitiesChange]);

  const handleAmenityChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[];
    setAmenities(value);
    onAmenitiesChange(value);
  };

  const handleChipDelete = (
    amenityToDelete: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    const updatedAmenities = amenities.filter((amenity) => amenity !== amenityToDelete);
    setAmenities(updatedAmenities);
    onAmenitiesChange(updatedAmenities);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Amenities
      </Typography>
      <FormControl fullWidth>
        <Select
          multiple
          value={amenities}
          onChange={handleAmenityChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                overflowY: "auto",
              },
            },
          }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onMouseDown={(event) => event.stopPropagation()}
                  onDelete={(event) => handleChipDelete(value, event)}
                />
              ))}
            </Box>
          )}
        >
          {amenitiesList.map((amenity) => (
            <MenuItem key={amenity} value={amenity}>
              <Checkbox checked={amenities.includes(amenity)} />
              {amenity}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
