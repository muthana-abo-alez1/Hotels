import * as Yup from "yup";

export const roomsValidationSchema = Yup.object().shape({
  roomNumber: Yup.string()
    .required("Room number is required")
    .matches(/^[0-9]+$/, "Room number must contain only numbers"),
  roomType: Yup.string()
    .required("Room type is required")
    .oneOf(
      ["Standard", "Suite", "Deluxe", "Economy", "Family Suite"],
      "Invalid room type"
    ),
  capacityOfAdults: Yup.number()
    .required("Capacity of adults is required")
    .min(1, "Capacity of adults must be at least 1")
    .max(10, "Capacity of adults must be at most 10"),
  capacityOfChildren: Yup.number()
    .required("Capacity of children is required")
    .min(0, "Capacity of children cannot be negative")
    .max(10, "Capacity of children must be at most 10"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
  roomAmenities: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Amenity name is required")
        .min(2, "Amenity name must be at least 2 characters")
        .max(50, "Amenity name must be less than 50 characters"),
      description: Yup.string()
        .required("Amenity description is required")
        .min(5, "Description must be at least 5 characters")
        .max(200, "Description must be less than 200 characters"),
    })
  ),
});