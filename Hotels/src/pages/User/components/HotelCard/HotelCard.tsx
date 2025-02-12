import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setIdSelectedHotel } from "../../../../redux/reducers/hotelsSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

interface HotelCardProps {
  hotelName: string;
  starRating: number;
  cityName?: string;
  thumbnailUrl?: string;
  priceLowerBound?: number;
  priceUpperBound?: number;
  hotelType?: string;
  description?: string;
  hotelId?: number;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotelName,
  starRating,
  cityName = "",
  thumbnailUrl = "",
  priceLowerBound,
  priceUpperBound,
  hotelType = "",
  description = "",
  hotelId = 0,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const encodeHotelId = (id: number) => {
    const encodedId = btoa(id.toString());
    return encodedId;
  };

  const handleClick = () => {
    if (hotelId) {
      dispatch(setIdSelectedHotel(hotelId));
      const encodedId = encodeHotelId(hotelId);
      const today = dayjs().format("YYYY-MM-DD");
      const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
      const queryParams = new URLSearchParams({
        id: encodedId,
        checkInDate: today,
        checkOutDate: tomorrow,
      }).toString();
      navigate(`/user/hotel/data?${queryParams}`);
    }
  };

  return (
    <Card
      sx={{
        margin: "16px",
        width: "270px",
        minWidth: "210px",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onClick={handleClick}
    >
      {thumbnailUrl && (
        <CardMedia
          component="img"
          height="150"
          image={thumbnailUrl}
          alt={`${hotelName} Photo`}
        />
      )}
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          color="secondary"
        >
          {hotelName}
        </Typography>

        {hotelType && (
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {hotelType}
          </Typography>
        )}

        {cityName && (
          <Typography variant="body2" color="text.secondary">
            {cityName}
          </Typography>
        )}
        {description && (
          <Box mt={2} sx={{ height: "40px" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 2,
                maxHeight: "3em",
                minHeight: "3m",
              }}
            >
              {description}
            </Typography>
          </Box>
        )}
        <Box mt={1}>
          <Rating value={starRating} precision={0.5} readOnly />
        </Box>

        {(priceLowerBound !== undefined || priceUpperBound !== undefined) && (
          <Box mt={1}>
            <Typography variant="body1" color="secondary" fontWeight="bold">
              {`$${priceLowerBound || 0} - $${priceUpperBound || 0}`}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelCard;
