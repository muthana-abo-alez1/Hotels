import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { citiesValidationSchema } from "./validation";
import { LoadingButton } from "@mui/lab";
import { postCity, updateCity } from "apis/admin/cities/CitiesApis";
import { showSuccessSnackbar } from "utils/snackbarUtils";
import { useDispatch, useSelector } from "react-redux";
import { addCity, updateCity as updateCityAction } from "../../../../../../redux/reducers/citiesSlice";

interface CitiesFormProps {
  onClose: () => void;
  isSelectedCity: boolean;
}

const CitiesForm: React.FC<CitiesFormProps> = ({ onClose, isSelectedCity }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: any) => state.cities.selectedCity);
  const initialValues = isSelectedCity && selectedCity 
    ? { name: selectedCity.name, description: selectedCity.description }
    : { name: "", description: "" };

  const handleAddCity = async (values: { name: string; description: string }) => {
    setLoading(true);
    try {
      const newCity = await postCity({ name: values.name, description: values.description });
      dispatch(addCity(newCity));
      showSuccessSnackbar("City Added", `The city "${newCity.name}" has been successfully added!`);
    } catch (error) {
      console.error("Failed to add city:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleUpdateCity = async (values: { name: string; description: string }) => {
    if (!selectedCity?.id) return;
    setLoading(true);
    try {
      await updateCity(selectedCity.id, { name: values.name, description: values.description });
      dispatch(updateCityAction({ ...selectedCity, ...values })); 
      showSuccessSnackbar("City Updated", `The city "${values.name}" has been successfully updated!`);
    } catch (error) {
      console.error("Failed to update city:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleSubmit = (values: { name: string; description: string }) => {
    if (isSelectedCity) {
      handleUpdateCity(values);
    } else {
      handleAddCity(values);
    }
  };

  return (
    <Formik
      enableReinitialize 
      initialValues={initialValues}
      validationSchema={citiesValidationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 3,
            }}
          >
            <Field
              name="name"
              as={TextField}
              label="City Name"
              color="secondary"
              fullWidth
              variant="outlined"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            <Field
              name="description"
              as={TextField}
              label="Description"
              color="secondary"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              loadingPosition="center"
              disabled={isSubmitting}
            >
              {isSelectedCity ? "Update City" : "Add City"}
            </LoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CitiesForm;
