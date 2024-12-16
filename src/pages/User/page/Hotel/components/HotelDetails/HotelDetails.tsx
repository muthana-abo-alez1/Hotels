import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import AmenitiesIcons from "pages/User/components/Amenities/AmenitiesIcons";
const HotelDetails = ({ hotelData }: { hotelData: any }) => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {hotelData.hotelName}
      </Typography>
      <Box>
        <Rating value={hotelData.starRating} precision={0.5} readOnly />
      </Box>
      <Box sx={{display:"felx", alignItems:"center" ,}}>
        <Typography variant="subtitle1" gutterBottom>
          <LocationOnIcon sx={{ verticalAlign: "middle", marginRight: 1 }} />
          {hotelData.location}
        </Typography>
      </Box>
      <Typography variant="body1" paragraph>
        {hotelData.description}
      </Typography>
      <Box>
      <AmenitiesIcons amenities={hotelData.amenities} />
      </Box>
    </Box>
  );
};

export default HotelDetails;
