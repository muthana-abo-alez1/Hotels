import { Box, Typography, Button, useTheme } from "@mui/material";
import React from "react";
import { Formik, Form } from "formik";
import { validationPaymentInfoSchema } from "./validation";
import CustomTextField from "pages/User/components/CustomTextField";
import { PaymentInfoData } from "interfaces/PaymentInfoData";

interface PaymentInfoProps {
  totalPrice: number;
  onSubmitPayment: (paymentData: PaymentInfoData) => void; 
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ totalPrice, onSubmitPayment }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { sx: 1, xs: 2, md: 4 },
        maxWidth: 600,
        margin: { sx: "auto 10px", xs: "auto 20px", md: "auto" },
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Payment
      </Typography>

      <Formik
        initialValues={{
          cardholderName: "",
          cardNumber: "",
          expiryDate: "",
          securityCode: "",
        }}
        validationSchema={validationPaymentInfoSchema}
        onSubmit={(values) => {
          onSubmitPayment(values);  
        }}
      >
        {() => (
          <Form>
            <CustomTextField label="Cardholder Name" name="cardholderName" placeholder="Ex: MutAbuAleez" />
            <CustomTextField label="Card Number" name="cardNumber" placeholder="0000 - 0000 - 0000 - 0000" />
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <CustomTextField label="Expiry Date" name="expiryDate" placeholder="MM/YY" />
              <CustomTextField label="Security Code" name="securityCode" placeholder="3 digits" />
            </Box>

            <Button
              variant="contained"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                width: "100%",
                maxWidth: "200px",
                display: "block",
                margin: "auto",
                mt: 4,
              }}
              type="submit"
            >
              Pay ${totalPrice.toFixed(2)}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentInfo;
