import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { HotelSearch } from "interfaces/Hotel";
import { validationSchema } from "./validation";

interface SortSidebarProps {
  hotels: Array<HotelSearch>;
  setHotels: React.Dispatch<React.SetStateAction<Array<HotelSearch>>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

const SortSidebar: React.FC<SortSidebarProps> = ({
  hotels,
  setHotels,
  setLoading,
  toggleSidebar,
}) => {
  const theme = useTheme();

  const handleApplySort = (values: { sortOrder: string; sortColumn: string }) => {
    const { sortOrder, sortColumn } = values;

    setLoading(true);

    const sortedHotels = [...hotels].sort((a: any, b: any) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    toggleSidebar();
    setTimeout(() => {
      setHotels(sortedHotels);
      setLoading(false);
    }, 500);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "max-content",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Sort Options
      </Typography>

      <Formik
        initialValues={{
          sortOrder: "asc",
          sortColumn: "roomPrice",
        }}
        validationSchema={validationSchema}
        onSubmit={handleApplySort}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 3,
              }}
            >
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Sort Order
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.sortOrder === "asc"}
                      onChange={() => setFieldValue("sortOrder", "asc")}
                    />
                  }
                  label="Ascending"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.sortOrder === "desc"}
                      onChange={() => setFieldValue("sortOrder", "desc")}
                    />
                  }
                  label="Descending"
                />
              </Box>
              {touched.sortOrder && errors.sortOrder && (
                <Typography color="error" variant="caption">
                  {errors.sortOrder}
                </Typography>
              )}

              <Field
                name="sortColumn"
                as={TextField}
                select
                fullWidth
                label="Sort By"
                variant="outlined"
                error={touched.sortColumn && Boolean(errors.sortColumn)}
                helperText={touched.sortColumn && errors.sortColumn}
              >
                <MenuItem value="roomPrice">Room Price</MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
                <MenuItem value="starRating">Star Rating</MenuItem>
              </Field>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "auto",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ flex: 1 ,color:"white"}}
                  type="submit"
                  
                >
                  Apply Sort
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SortSidebar;
