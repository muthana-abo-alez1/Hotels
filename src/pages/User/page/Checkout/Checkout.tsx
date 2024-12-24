import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  useTheme,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import ReservationInfo from "./components/ReservationInfo";
import PaymentInfo from "./components/PaymentInfo";
import CustomStepConnector from "./components/CustomStepConnector";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { PersonalInfoFormValues } from "interfaces/PersonalInfoFormValues";
import {
  showErrorSnackbar,
  showInfoSnackbar,
  showSuccessSnackbar,
} from "utils/snackbarUtils";
import { PaymentInfoData } from "interfaces/PaymentInfoData";
import { Booking } from "interfaces/Booking";
import { postBooking } from "apis/user/booking/BookingApis";
import BookingConfirmationDialog from "./components/BookingConfirmationDialog";

const steps = ["1", "2", "3"];

const Checkout = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const { room, hotelId, numberOfDays, checkIn, checkOut } =
    location.state || {};
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [hotelName, setHotelName] = useState<string>("");
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfoFormValues | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentInfoData | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePaymentSubmit = (data: PaymentInfoData) => {
    setPaymentData(data);
    setDialogOpen(true);
  };
  const handleConfirm = async () => {
    if (!personalInfo) {
      showInfoSnackbar("Error", "Please complete all steps before confirming.");
      return;
    }

    const bookingData: Booking = {
      customerName: personalInfo.guestFullName,
      hotelName: hotelName,
      roomNumber: `${room?.roomNumber}` || "",
      roomType: room?.roomType || "",
      bookingDateTime: new Date().toISOString(),
      totalCost: totalPrice,
      paymentMethod: "Online",
    };

    try {
      const response = await postBooking(bookingData);
      showSuccessSnackbar("Success", "Your booking was successful!");

      navigate("/user/confirmation", {
        state: {
          message: "Your booking was successful!",
          bookingDetails: {
            hotelName,
            img: room.roomPhotoUrl || "https://via.placeholder.com/80",
            roomNumber: room?.roomNumber || "Room Number",
            totalCost: totalPrice,
            checkIn,
            checkOut,
          },
        },
      });
    } catch (error) {
      showErrorSnackbar("Error", "There was an issue with your booking.");
    } finally {
      setDialogOpen(false);
    }
  };
  const handleStep = (step: number) => () => {
    if (step === 2) {
      if (personalInfo) {
        setActiveStep(step);
      } else {
        showInfoSnackbar(
          "Error",
          "Please fill in the personal information before proceeding."
        );
      }
    } else {
      setActiveStep(step);
    }
  };
  const handleTotalPriceChange = (price: number) => {
    setTotalPrice(price);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        paddingTop: 5,
        px: 2,
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        edge="start"
        sx={{
          color: "white",
          position: "absolute",
          left: "48px",
          top: "93px",
          zIndex: 1000,
          bgcolor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "#1976d2",
          },
          marginRight: "1rem",
        }}
      >
        <ChevronLeft />
      </IconButton>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", mb: 2, fontWeight: "bold", mt: 5 }}
      >
        Booking Details
      </Typography>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomStepConnector />}
        sx={{
          width: "100%",
          maxWidth: "600px",
          mb: 3,
          "& .MuiStepLabel-label": { display: "none" },
        }}
      >
        {steps.map((number, index) => (
          <Step key={index} onClick={handleStep(index)}>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor:
                      activeStep >= index
                        ? theme.palette.primary.main
                        : theme.palette.background.paper,
                    color:
                      activeStep >= index ? "#fff" : theme.palette.primary.main,
                    border: `solid 2px ${theme.palette.primary.main}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                >
                  {number}
                </Box>
              )}
            />
          </Step>
        ))}
      </Stepper>

      <Box sx={{ width: "100%", maxWidth: "600px", minHeight: "470px" }}>
        {activeStep === 0 && (
          <ReservationInfo
            handleNext={handleNext}
            onTotalPriceChange={handleTotalPriceChange}
            room={room}
            hotelId={hotelId}
            numberOfDays={numberOfDays}
            setHotelName={setHotelName}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        )}
        {activeStep === 1 && (
          <PersonalInfo
            handleNext={handleNext}
            initialValues={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
        )}

        {activeStep === 2 && (
          <PaymentInfo
            totalPrice={totalPrice}
            onSubmitPayment={handlePaymentSubmit}
          />
        )}
      </Box>
      <BookingConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        data={{
          number: room?.roomNumber || "Room Number",
          img: room.roomPhotoUrl || "https://via.placeholder.com/80",
          price: room?.price || 0,
          roomType: room?.roomType || "Room Type",
          numberOfDays: numberOfDays || 1,
          totalCost: totalPrice || 0,
          checkIn: checkIn,
          checkOut: checkOut,
        }}
      />
    </Box>
  );
};

export default Checkout;
