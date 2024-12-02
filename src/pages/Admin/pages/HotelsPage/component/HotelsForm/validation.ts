import * as Yup from "yup";

export const hotelsValidationSchema = Yup.object().shape({
  name: Yup.string().required("Hotel name is required"),
  description: Yup.string().required("Description is required"),
  hotelType: Yup.number().required("Hotel type is required").oneOf([1, 2, 3], "Invalid hotel type"),
  starRating: Yup.number()
    .required("Star rating is required")
    .min(1, "Star rating must be at least 1")
    .max(5, "Star rating must be at most 5"),
  latitude: Yup.number()
    .required("Latitude is required")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: Yup.number()
    .required("Longitude is required")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});
