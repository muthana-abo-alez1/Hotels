import * as Yup from "yup";

export const validationPersonalInfoSchema = Yup.object({
  guestFullName: Yup.string().min(8, "Full Name must be at least 8 characters")
  .max(20, "Full Name must be less than 20 characters")
  .required("Guest Full Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\+?[1-9]\d{9,14}$/,
      "Phone number must be 10-15 digits and may start with a '+'"
    )
    .required("Phone number is required"),

  additionalInfo: Yup.string()
    .max(200, "Additional information must be less than 200 characters")
    .nullable(),
});
