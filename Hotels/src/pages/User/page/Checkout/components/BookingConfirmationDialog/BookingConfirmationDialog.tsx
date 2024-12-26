import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface BookingConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  data?: {
    number: string;
    img: string;
    price: number;
    roomType: string;
    numberOfDays: number;
    totalCost: number;
    checkIn: string;
    checkOut: string;
  };
}

const BookingConfirmationDialog: React.FC<BookingConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  data,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error during confirmation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="dialog-title" align="center">
        Confirm Booking Details
      </DialogTitle>
      <DialogContent>
        {data ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Avatar
              src={data.img}
              alt={data.number}
              sx={{
                width: 250,
                height: 150,
                borderRadius: "8px",
                boxShadow: 3,
              }}
            />
            <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>
              {data.number}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" gutterBottom>
              {data.roomType}
            </Typography>

            <Box textAlign="center" sx={{ width: "100%" }}>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                <strong>Check-in:</strong> {data.checkIn}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                <strong>Check-out:</strong> {data.checkOut}
              </Typography>
            </Box>
            <Box textAlign="center" mb={2}>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                <strong>Price per night:</strong> ${data.price}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                <strong>Number of nights:</strong> {data.numberOfDays}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 400, mt: 1 }}>
                <strong>Total Cost:</strong> ${data.totalCost}
              </Typography>
            </Box>

            
          </Box>
        ) : (
          <Typography color="error" align="center">
            No booking details provided.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mb: 3 }}>
        <Button onClick={onClose} color="secondary" variant="outlined" disabled={loading}>
          Cancel
        </Button>
        <LoadingButton
          onClick={handleConfirm}
          loading={loading}
          color="primary"
          variant="contained"
          sx={{
            color:"white"
          }}
        >
          Confirm Booking
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default BookingConfirmationDialog;
