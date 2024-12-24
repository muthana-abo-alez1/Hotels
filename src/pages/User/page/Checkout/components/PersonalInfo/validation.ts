import * as Yup from "yup";

export const validationPersonalInfoSchema = Yup.object({
  guestFullName: Yup.string().min(8, "Full Name must be at least 8 characters")
  .max(20, "Full Name must be less than 20 characters")
  .required("Guest Full Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number format")
    .required("Phone number is required"),
  additionalInfo: Yup.string(),
});
