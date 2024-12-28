import { Box, TextField, Typography, Button, useTheme } from "@mui/material";
import React from "react";
import { Formik, Form } from "formik";
import { validationPersonalInfoSchema } from "./validation";
import CustomTextField from "pages/User/components/CustomTextField";

interface PersonalInfoProps {
  handleNext: () => void;
  initialValues?: PersonalInfoFormValues|null;
  setPersonalInfo:(data: PersonalInfoFormValues) => void;
}

interface PersonalInfoFormValues {
  guestFullName: string;
  email: string;
  phoneNumber: string;
  additionalInfo: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ handleNext, initialValues ,setPersonalInfo}) => {
  const theme = useTheme();
  const initialFormValues: PersonalInfoFormValues = initialValues || {
    guestFullName: "",
    email: "",
    phoneNumber: "",
    additionalInfo: "",
  };

  return (
    <Box
      sx={{
        p: { sx: 1, xs: 2, md: 4 },
        maxWidth: 700,
        margin: { sx: "auto 10px", xs: "auto 20px", md: "auto" },
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Your Personal Information
      </Typography>

      <Formik
        initialValues={initialFormValues}
        validationSchema={validationPersonalInfoSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleNext();
          setPersonalInfo(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <CustomTextField name="guestFullName" label="Guest Full Name" placeholder="Ex: Muthana Abu Aleez"/>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <CustomTextField name="email" label="Email" type="email" placeholder="Ex: test@gmail.com"/>
            <CustomTextField name="phoneNumber" label="Phone Number" type="tel" placeholder="Ex: +972 500 000 000"/>
          </Box>
          <CustomTextField
            name="additionalInfo"
            label="Additional Information (optional)"
            rows={4}
            placeholder="Additional Information (optional)"
          />

          <Button
            variant="contained"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              width: "100%",
              maxWidth: "200px",
              display: "block",
              margin: "auto",
            }}
            type="submit"
          >
            Next
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default PersonalInfo;
