import { Box, Typography, Button, useTheme, TextField } from "@mui/material";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputMask from "react-input-mask";
import { validationPaymentInfoSchema } from "./validation";
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
        p: { xs: 2, md: 4 },
        maxWidth: 600,
        margin: { xs: "auto 10px", md: "auto" },
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
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              label="Cardholder Name"
              name="cardholderName"
              placeholder="Ex: MutAbuAleez"
              fullWidth
              margin="normal"
              error={touched.cardholderName && Boolean(errors.cardholderName)}
              helperText={touched.cardholderName && errors.cardholderName}
            />

            <InputMask
              mask="9999-9999-9999-9999"
              value={values.cardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {() => (
                <Field
                  as={TextField}
                  label="Card Number"
                  name="cardNumber"
                  placeholder="0000-0000-0000-0000"
                  fullWidth
                  margin="normal"
                  error={touched.cardNumber && Boolean(errors.cardNumber)}
                  helperText={touched.cardNumber && errors.cardNumber}
                />
              )}
            </InputMask>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <InputMask
                mask="99/99"
                value={values.expiryDate}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {() => (
                  <Field
                    as={TextField}
                    label="Expiry Date"
                    name="expiryDate"
                    placeholder="MM/YY"
                    fullWidth
                    error={touched.expiryDate && Boolean(errors.expiryDate)}
                    helperText={touched.expiryDate && errors.expiryDate}
                  />
                )}
              </InputMask>

              <Field
                as={TextField}
                label="Security Code"
                name="securityCode"
                placeholder="3 digits"
                fullWidth
                error={touched.securityCode && Boolean(errors.securityCode)}
                helperText={touched.securityCode && errors.securityCode}
              />
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
