import * as Yup from "yup";

export const validationPaymentInfoSchema = Yup.object({
  cardholderName: Yup.string()
    .trim()
    .min(4, "Cardholder name must be at least 4 characters")
    .max(20, "Cardholder name must be less than 20 characters")
    .matches(/^[A-Za-z\s]+$/, "Cardholder name must contain only letters and spaces")
    .required("Cardholder name is required"),

  cardNumber: Yup.string()
    .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Card number must be in the format 1234-5678-9012-3456")
    .required("Card number is required"),

  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Expiry date must be in MM/YY format")
    .required("Expiry date is required"),

  securityCode: Yup.string()
    .matches(/^\d{3}$/, "Security code must contain only 3 digits")
    .required("Security code is required"),
});
