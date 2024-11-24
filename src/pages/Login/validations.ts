import * as Yup from 'yup';
export const loginValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
});