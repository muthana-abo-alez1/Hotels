import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getHotels } from "apis/admin/hotels/HotelsApis";
import { setHotels } from "../../../../../../redux/reducers/hotelsSlice";
import { Hotel } from "interfaces/Hotel";

interface HotelSelectionDialogProps {
  open: boolean;
  onClose: (selectedHotel: Hotel | null) => void;
}

const HotelSelectionDialog: React.FC<HotelSelectionDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: any) => state.hotels.hotels);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const fetchCities = useCallback(
    async (
      searchTerm: string = "",
      pageNumber: number = 1,
      pageSize: number = 100
    ) => {
      try {
        const data = await getHotels("", "", pageSize, pageNumber);
        dispatch(setHotels(data));
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
      fetchCities();
  }, [fetchCities]);

  const handleProceed = () => {
    if (selectedHotel) {
      onClose(selectedHotel);
    } else {
      alert("Please select a hotel to proceed.");
    }
  };

  return (
    <Dialog open={open} onClose={() => {}} maxWidth="sm" fullWidth>
      <DialogTitle>Select a Hotel</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="body2" color="textSecondary" paragraph>
            Please select a Hotel from the dropdown below.
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Select Hotel</InputLabel>
            <Select
              value={selectedHotel ? selectedHotel.id : ""}
              onChange={(e) =>
                setSelectedHotel(
                  hotels.find(
                    (hotel: Hotel) => hotel.id === Number(e.target.value)
                  ) || null
                )
              }
              label="Select City"
              color="secondary"
            >

              {hotels.map((hotel: Hotel) => (
                <MenuItem key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceed}
          fullWidth
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HotelSelectionDialog;
