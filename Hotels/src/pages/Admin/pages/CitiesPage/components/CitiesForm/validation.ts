import * as Yup from "yup";

export const citiesValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name is too short"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description is too short"),
});
