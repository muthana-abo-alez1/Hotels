import React, { useState, useEffect } from "react";
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Rating } from "@mui/material";

interface StarRatingFilterProps {
  value: number | null;  
  onChange: (value: number | null) => void; 
  reset: boolean;  
}

const StarRatingFilter: React.FC<StarRatingFilterProps> = ({ value, onChange, reset }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(value);

  useEffect(() => {
    setSelectedRating(value);
  }, [value]);

  useEffect(() => {
    if (reset) {
      setSelectedRating(null);
      onChange(null); 
    }
  }, [reset, onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(event.target.value, 10);
    setSelectedRating(newRating);
    onChange(newRating);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Star Rating
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          name="star-rating"
          value={selectedRating?.toString() || ""}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <FormControlLabel
              key={star}
              value={star.toString()}
              control={<Radio />}
              label={<Rating value={star} readOnly />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default StarRatingFilter;
