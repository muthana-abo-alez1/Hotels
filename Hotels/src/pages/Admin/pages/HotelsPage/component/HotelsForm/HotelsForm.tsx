import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { LoadingButton } from "@mui/lab";
import { postHotel, updateHotel } from "apis/admin/hotels/HotelsApis";
import { showSuccessSnackbar } from "utils/snackbarUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  addHotel,
  updateHotel as updateHotelAction,
} from "../../../../../../redux/reducers/hotelsSlice";
import { hotelsValidationSchema } from "./validation";
import { getCities } from "apis/admin/cities/CitiesApis";
import { setCities } from "../../../../../../redux/reducers/citiesSlice";

interface HotelsFormProps {
  onClose: () => void;
  isSelectedHotel: boolean;
}

const HotelsForm: React.FC<HotelsFormProps> = ({
  onClose,
  isSelectedHotel,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedHotel = useSelector((state: any) => state.hotels.selectedHotel);

  const cities = useSelector((state: any) => state.cities.cities);

  useEffect(() => {
    const fetchCities = async () => {
      if (!cities.length) {
        try {
          const fetchedCities = await getCities("", "", 50, 1);
          dispatch(setCities(fetchedCities));
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    fetchCities();
  }, [cities.length, dispatch]);

  const initialValues =
    isSelectedHotel && selectedHotel
      ? {
          name: selectedHotel.name,
          description: selectedHotel.description,
          hotelType: selectedHotel.hotelType,
          starRating: selectedHotel.starRating,
          latitude: selectedHotel.latitude,
          longitude: selectedHotel.longitude,
          cityId: selectedHotel.cityId || "",
        }
      : {
          name: "",
          description: "",
          hotelType: 0,
          starRating: 1,
          latitude: 0,
          longitude: 0,
          cityId: "",
        };

  const handleAddHotel = async (values: {
    name: string;
    description: string;
    hotelType: number;
    starRating: number;
    latitude: number;
    longitude: number;
    cityId: string;
  }) => {
    setLoading(true);
    try {
      const newHotel = await postHotel(values.cityId, values);
      dispatch(addHotel(newHotel));
      showSuccessSnackbar(
        "Hotel Added",
        `The hotel "${newHotel.name}" has been successfully added!`
      );
    } catch (error) {
      console.error("Failed to add hotel:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleUpdateHotel = async (values: {
    name: string;
    description: string;
    hotelType: number;
    starRating: number;
    latitude: number;
    longitude: number;
    cityId: string;
  }) => {
    if (!selectedHotel?.id) return;
    setLoading(true);
    try {
      await updateHotel(selectedHotel.id, values);
      dispatch(updateHotelAction({ ...selectedHotel, ...values }));
      showSuccessSnackbar(
        "Hotel Updated",
        `The hotel "${values.name}" has been successfully updated!`
      );
    } catch (error) {
      console.error("Failed to update hotel:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleSubmit = (values: {
    name: string;
    description: string;
    hotelType: number;
    starRating: number;
    latitude: number;
    longitude: number;
    cityId: string;
  }) => {
    if (isSelectedHotel) {
      handleUpdateHotel(values);
    } else {
      handleAddHotel(values);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={hotelsValidationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched, isSubmitting, dirty }) => (
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
              label="Hotel Name"
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
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"center", gap:1}}>
              {!isSelectedHotel && (
                <FormControl fullWidth variant="outlined">
                  <InputLabel>City</InputLabel>
                  <Field
                    name="cityId"
                    as={Select}
                    label="City"
                    color="secondary"
                    error={touched.cityId && Boolean(errors.cityId)}
                  >
                    {cities.map((city: any) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              )}
              <FormControl fullWidth variant="outlined">
                <InputLabel>Hotel Type</InputLabel>
                <Field
                  name="hotelType"
                  color="secondary"
                  as={Select}
                  label="Hotel Type"
                  error={touched.hotelType && Boolean(errors.hotelType)}
                >
                  <MenuItem value={1}>Luxury</MenuItem>
                  <MenuItem value={2}>Economy</MenuItem>
                  <MenuItem value={3}>Budget</MenuItem>
                </Field>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel>Star Rating</InputLabel>
                <Field
                  name="starRating"
                  color="secondary"
                  as={Select}
                  label="Star Rating"
                  error={touched.starRating && Boolean(errors.starRating)}
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      {rating} Star
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
            </Box>

            <Field
              name="latitude"
              as={TextField}
              label="Latitude"
              color="secondary"
              fullWidth
              variant="outlined"
              type="number"
              error={touched.latitude && Boolean(errors.latitude)}
              helperText={touched.latitude && errors.latitude}
            />

            <Field
              name="longitude"
              as={TextField}
              label="Longitude"
              color="secondary"
              fullWidth
              variant="outlined"
              type="number"
              error={touched.longitude && Boolean(errors.longitude)}
              helperText={touched.longitude && errors.longitude}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              loadingPosition="center"
              disabled={!dirty || isSubmitting}
            >
              {isSelectedHotel ? "Update Hotel" : "Add Hotel"}
            </LoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default HotelsForm;