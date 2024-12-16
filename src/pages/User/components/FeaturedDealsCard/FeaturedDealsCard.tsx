import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  useTheme,
  Button,
} from "@mui/material";
import style from "./FeaturedDealsCard.module.scss";
import { HotelCard } from "interfaces/specificHotel";
import { useNavigate } from "react-router-dom";


const FeaturedDealsCard: React.FC<HotelCard> = ({
  originalRoomPrice,
  finalPrice,
  discount,
  cityName,
  hotelName,
  hotelStarRating,
  title,
  description,
  roomPhotoUrl,
  hotelId,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const encodeHotelId = (id: number) => {
    const encodedId = btoa(id.toString()); 
    return encodedId;
  };

  const handleClick = () => {
    if (hotelId) {
      const encodedId = encodeHotelId(hotelId);
      navigate(`/user/hotel/${encodedId}`); 
    }
  };
  return (
    <Card
      className={style.hotelCard}
      sx={{
        maxWidth: 345,
        borderRadius: "16px",
        boxShadow: theme.shadows[3],
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        height:"500px"
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={roomPhotoUrl}
        alt={hotelName}
        sx={{
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />

      <Box
        className="hover-overlay"
        sx={{
          display: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">{description}</Typography>
      </Box>

      <CardContent sx={{ padding: theme.spacing(2) }}>
        <Typography variant="h6" component="div" sx={{minHeight:"65px"}}>
          {hotelName} - {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {cityName}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <Rating value={hotelStarRating} readOnly precision={0.5} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {hotelStarRating.toFixed(1)}
          </Typography>
        </Box>

        <Box sx={{ marginTop: 1 }}>
          <Typography variant="h6" color="primary">
            ${finalPrice.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textDecoration: "line-through" }}
          >
            ${originalRoomPrice.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            color="white"
            sx={{
              fontWeight: "bold",
              marginTop: 1,
              backgroundColor: "#e61e43",
              padding: "2px 8px",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            {Math.round(discount * 100)}% off
          </Typography>
        </Box>
        <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: "10px",
              width: "100%",
              height: "50px",
              alignSelf: "flex-end",
            }}
            onClick={handleClick}
          >
            More Details
          </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedDealsCard;
