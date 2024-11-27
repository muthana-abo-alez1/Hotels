import React, { useState } from "react";
import { Box, TextField, Typography, Container } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton"; 
import { useFormik } from "formik";
import { ILoginPayload } from "interfaces/AuthenticationRequest";
import { loginValidationSchema } from "./validations";
import ThemeSwitcher from "components/ThemeSwitcher";
import style from "./Login.module.scss";
import { useAuth } from "context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false); 

  const formik = useFormik<ILoginPayload>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setLoading(true); 
      try {
        await login(values);
      } finally {
        setLoading(false); 
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <div className={style.themeSwitcher}>
        <ThemeSwitcher />
      </div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={loading} 
            sx={{ mt: 2 }}
          >
            Login
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
