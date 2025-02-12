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
import amenityIcons from "types/AmenityType";

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
    const updatedAmenities = amenities.filter(
      (amenity) => amenity !== amenityToDelete
    );
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
          {Object.entries(amenityIcons).map(([amenityName]) => (
            <MenuItem key={amenityName} value={amenityName}>
              <Checkbox checked={amenities.includes(amenityName)} />
              {amenityName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
