import * as Yup from "yup";

export const validationPaymentInfoSchema = Yup.object({
  cardholderName: Yup.string()
  .min(4, "Cardholder name must be at least 4 characters")
  .max(20, "Cardholder name must be less than 20 characters")
  .required("Cardholder name is required"),
  cardNumber: Yup.string()
    .length(16, "Card number must be 16 digits")
    .matches(/^[0-9]{16}$/, "Card number must contain only digits")
    .required("Card number is required"),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    )
    .required("Expiry date is required"),
  securityCode: Yup.string()
    .length(3, "Security code must be 3 digits")
    .matches(/^[0-9]{3}$/, "Security code must contain only digits")
    .required("Security code is required"),
});
