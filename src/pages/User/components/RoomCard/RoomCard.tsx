import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  useTheme,
  Button,
  Stack,
} from "@mui/material";
import { Room } from "interfaces/Room";
import AmenitiesIcons from "../Amenities/AmenitiesIcons";
import HotelIcon from "@mui/icons-material/Hotel";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const RoomCard = ({ room }: { room: Room }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: 330,
        maxHeight:430,
        margin: "auto",
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={room.roomPhotoUrl}
        alt={`Room ${room.roomNumber}`}
        sx={{
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      />

      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "primary.main",
            maxHeight:33,
            textWrap:'nowrap',
          }}
        >
          {room.roomType} Room
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            marginTop: 1,
            color: "text.secondary",
            fontSize: "0.9rem",
            maxHeight:20,
          }}
        >
          <EmojiPeopleIcon fontSize="small" />
          <Typography variant="body2">
            Capacity: {room.capacityOfAdults} Adults
          </Typography>
          <FamilyRestroomIcon fontSize="small" />
          <Typography variant="body2">
            {room.capacityOfChildren} Children
          </Typography>
        </Stack>

        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            maxHeight:32,
          }}
        >
          <AmenitiesIcons amenities={room.roomAmenities} iconSize="small" backgroundColor={theme.palette.background.default}/>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5"  sx={{ fontWeight: "bold" }}>
            ${room.price}
          </Typography>
          <Typography
            variant="body1"
            color={room.availability ? "success.main" : "error.main"}
            fontWeight="bold"
          >
            {room.availability ? "Available" : "Not Available"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={!room.availability} 
          sx={{
            marginTop: "10px",
            width: "100%",
            height: "50px",
            alignSelf: "flex-end",
          }}
          //onClick={}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
