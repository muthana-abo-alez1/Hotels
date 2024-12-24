import * as Yup from "yup";

export const validationSchema = Yup.object({
  sortOrder: Yup.string().required("Sort order is required"),
  sortColumn: Yup.string().required("Sort column is required"),
});
