import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Skeleton,
} from "@mui/material";
import { HotelSearch } from "interfaces/Hotel";
import AmenitiesIcons from "../Amenities/AmenitiesIcons";
import { specificHotel } from "interfaces/specificHotel";
import { getHotel } from "apis/admin/hotels/HotelsApis";
import { useNavigate } from "react-router-dom";
import { setIdSelectedHotel } from "../../../../redux/reducers/hotelsSlice";
import { useDispatch } from "react-redux";

interface SearchCardProps {
  hotel: HotelSearch;
  checkInDate:string;
  checkOutDate:string;
}

const SearchCard: React.FC<SearchCardProps> = ({ hotel,checkInDate,checkOutDate }) => {
  const [hotelData, setHotelData] = useState<specificHotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const discountedPrice = (hotel.roomPrice * (1 - hotel.discount)).toFixed(2);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const encodeHotelId = (id: number) => {
    const encodedId = btoa(id.toString()); 
    return encodedId;
  };
  const fetchHotelData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getHotel(hotel.hotelId);
      setHotelData(data);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    } finally {
      setLoading(false);

    }
  }, [hotel.hotelId]);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  const handleClick = () => {
    if (hotel.hotelId) {
      dispatch(setIdSelectedHotel(hotel.hotelId))
      const encodedId = encodeHotelId(hotel.hotelId);
      const queryParams = new URLSearchParams({
        id:encodedId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      }).toString();
      navigate(`/user/hotel/data?${queryParams}`); 
    }
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row", md: "row" },
        height: { xs: "auto", sm: "370px", md: "250px" },
        width:"100%",
        borderRadius: 4,
        boxShadow: 3,
        overflow: "hidden",
        gap: 1,
        cursor:"pointer",
        "&:hover": {
          transform: "scale(1.009)",
        },
      }}
      onClick={handleClick} 
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: loading ? { xs: "100%", sm: "260px", md: "300px" } : "0px",
          height: loading ? { xs: "285px", sm: "100%" } : "0px",
          display: loading ? "block" : "none",
        }}
      />

      {!loading && (
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: "260px", md: "300px" },
            objectFit: "cover",
            height: { xs: "285px", sm: "100%" },
            
          }}
          image={hotel.roomPhotoUrl}
          alt={hotel.hotelName}
        />
      )}

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardContent>
          {loading ? (
            <>
              <Skeleton width="80%" height={32} />
              <Skeleton width="60%" height={20} />
              <Skeleton width="100%" height={24} sx={{ mt: 2 }} />
              <Skeleton width="40%" height={24} sx={{ mt: 2 }} />
              <Box mt={2}>
                <Skeleton width="90%" height={32} />
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {hotel.hotelName}
                </Typography>
                <Rating value={hotel.starRating} readOnly />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {hotel.cityName}
              </Typography>

              <Typography variant="body2" color="text.primary" mt={1}>
                {hotelData?.description || "No description available"}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {`Room Type : ${hotel.roomType}`}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  maxHeight: "77px",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Box mt={3} mb={2} display="flex" gap={2} flexWrap="wrap">
                  {hotel.amenities.map((amenity, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                      <AmenitiesIcons amenities={[amenity]} iconSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {amenity.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {hotel.discount > 0 ? (
                    <>
                      <Typography
                        variant="body2"
                        color="white"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "#e61e43",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          display: "inline-block",
                          fontSize: "18px",
                          maxHeight: "30px",
                        }}
                      >
                        {hotel.discount * 100}% off
                      </Typography>

                      <Typography fontWeight="bold" fontSize={"20px"}>
                        ${discountedPrice}
                      </Typography>
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                          fontSize: "12px",
                        }}
                      >
                        ${hotel.roomPrice}
                      </Typography>
                    </>
                  ) : (
                    <Typography fontWeight="bold">
                      ${hotel.roomPrice}
                    </Typography>
                  )}
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};

export default SearchCard;
