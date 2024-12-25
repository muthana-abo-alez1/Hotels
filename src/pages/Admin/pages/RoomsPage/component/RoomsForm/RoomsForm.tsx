import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  postAmenityForRoom,
  postPhotoForRoom,
  postRoom,
} from "apis/admin/rooms/RoomsApis";
import { showSuccessSnackbar } from "utils/snackbarUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom,
  updateRoom as updateRoomAction,
} from "../../../../../../redux/reducers/roomsSlice";
import { roomsValidationSchema } from "./validation";
import { Hotel } from "interfaces/Hotel";
import DropPhoto from "pages/Admin/components/DropPhoto";
import { Amenities } from "interfaces/amenities";
import DeleteIcon from "@mui/icons-material/Delete";

interface RoomsFormProps {
  onClose: () => void;
  isSelectedRoom: boolean;
  hotelId: Hotel | null;
}

const RoomsForm: React.FC<RoomsFormProps> = ({
  onClose,
  isSelectedRoom,
  hotelId,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedRoom = useSelector((state: any) => state.rooms.selectedRoom);
  const [imageUrl, setImageUrl] = useState<string>("");

  const initialValues =
    isSelectedRoom && selectedRoom
      ? {
          roomNumber: selectedRoom.roomNumber,
          roomType: selectedRoom.roomType,
          capacityOfAdults: selectedRoom.capacityOfAdults,
          capacityOfChildren: selectedRoom.capacityOfChildren,
          price: selectedRoom.price,
          availability: selectedRoom.availability ? "Available" : "Unavailable",
          roomPhotoUrl: selectedRoom.roomPhotoUrl || "",
          roomAmenities: selectedRoom.roomAmenities || [],
        }
      : {
          roomNumber: 0,
          roomType: "",
          capacityOfAdults: 1,
          capacityOfChildren: 0,
          price: 0,
          availability: "Available",
          roomPhotoUrl: "",
          roomAmenities: [],
        };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      let roomData = {
        ...values,
        availability: values.availability === "Available",
      };

      if (isSelectedRoom) {
        const updatedRoom = {
          ...selectedRoom,
          ...roomData,
          roomPhotoUrl: imageUrl,
        };
        dispatch(updateRoomAction(updatedRoom));
        showSuccessSnackbar(
          "Room Updated",
          `The room "${values.roomNumber}" has been successfully updated!`
        );
      } else {
        if (hotelId) {
          const newRoom = await postRoom(
            hotelId.id,
            values.roomNumber,
            values.price
          );
          roomData = {
            roomId: newRoom.id,
            ...roomData,
            roomPhotoUrl: imageUrl,
          };
          dispatch(addRoom(roomData));
          showSuccessSnackbar(
            "Room Added",
            `The room "${newRoom.roomNumber}" has been successfully added!`
          );

          const photo = await postPhotoForRoom(newRoom.id, imageUrl);
          dispatch(updateRoomAction({ ...roomData, roomPhotoUrl: photo.url }));
          for (const amenity of values.roomAmenities) {
            await postAmenityForRoom(
              newRoom.id,
              amenity.name,
              amenity.description
            );
          }
        }
      }
    } catch (error) {
      console.error("Failed to process room:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={roomsValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, dirty, values }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 3,
              minHeight: "max-content",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              <Field
                name="roomNumber"
                as={TextField}
                label="Room Number"
                fullWidth
                type="number"
                variant="outlined"
                color="secondary"
                error={touched.roomNumber && Boolean(errors.roomNumber)}
                helperText={touched.roomNumber && errors.roomNumber}
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel>Room Type</InputLabel>
                <Field
                  name="roomType"
                  as={Select}
                  label="Room Type"
                  color="secondary"
                  error={touched.roomType && Boolean(errors.roomType)}
                >
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Suite">Suite</MenuItem>
                  <MenuItem value="Deluxe">Deluxe</MenuItem>
                  <MenuItem value="Economy">Economy</MenuItem>
                  <MenuItem value="Family Suite">Family Suite</MenuItem>
                </Field>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
              }}
            >
              <Field
                name="capacityOfAdults"
                as={TextField}
                label="Capacity of Adults"
                variant="outlined"
                type="number"
                color="secondary"
                error={
                  touched.capacityOfAdults && Boolean(errors.capacityOfAdults)
                }
                helperText={touched.capacityOfAdults && errors.capacityOfAdults}
              />

              <Field
                name="capacityOfChildren"
                as={TextField}
                label="Capacity of Children"
                variant="outlined"
                type="number"
                color="secondary"
                error={
                  touched.capacityOfChildren &&
                  Boolean(errors.capacityOfChildren)
                }
                helperText={
                  touched.capacityOfChildren && errors.capacityOfChildren
                }
              />

              <Field
                name="price"
                as={TextField}
                label="Price"
                variant="outlined"
                color="secondary"
                type="number"
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
            </Box>

            <DropPhoto
              onImageUpload={handleImageUpload}
              url={initialValues.roomPhotoUrl}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel>Availability</InputLabel>
              <Field
                name="availability"
                as={Select}
                color="secondary"
                label="Availability"
                error={touched.availability && Boolean(errors.availability)}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Unavailable">Unavailable</MenuItem>
              </Field>
            </FormControl>

            <FieldArray name="roomAmenities">
              {({ push, remove }) => (
                <Box>
                  {values.roomAmenities.map(
                    (amenity: Amenities, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          marginBottom: 2,
                        }}
                      >
                        <Field
                          name={`roomAmenities[${index}].name`}
                          as={TextField}
                          label="Amenity Name"
                          fullWidth
                          variant="outlined"
                          color="secondary"
                        />
                        <Field
                          name={`roomAmenities[${index}].description`}
                          as={TextField}
                          label="Description"
                          color="secondary"
                          fullWidth
                          variant="outlined"
                        />
                        <IconButton color="error" onClick={() => remove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )
                  )}
                  <Button
                    variant="outlined"
                    onClick={() => push({ name: "", description: "" })}
                  >
                    Add Amenity
                  </Button>
                </Box>
              )}
            </FieldArray>

            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              loadingPosition="center"
              disabled={!dirty || isSubmitting}
            >
              {isSelectedRoom ? "Update Room" : "Add Room"}
            </LoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RoomsForm;