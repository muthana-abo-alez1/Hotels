import React, { useEffect } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useFormik } from "formik";
import { login } from "services/login/authService";
import { useNavigate } from "react-router-dom";
import { ILoginPayload } from "interfaces/ILoginPayload.interface";
import { loginValidationSchema } from "./validations";
import ThemeSwitcher from "components/ThemeSwitcher";
import style from "./Login.module.scss"
import { getToken, getUserType } from "utils/tokenUtils";
import { ROUTES } from "constants/Routing.constants";

const Login: React.FC = () => {
const navigate = useNavigate()
  const token = getToken()
  useEffect(()=>{
    if(token){
      navigate(`/${getUserType()?.toLowerCase()}${ROUTES.HOME}`)
    }
  },[token])

  const formik = useFormik<ILoginPayload>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
        try {
          const response = await login(values);
          navigate(`/${response.userType.toLowerCase()}`);
        } catch (error) {
          console.error("Login failed:", error);
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
