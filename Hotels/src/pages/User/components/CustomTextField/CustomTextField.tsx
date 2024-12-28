import { TextField } from "@mui/material";
import { FieldHookConfig, useField } from "formik";

const CustomTextField: React.FC<{ label: string, placeholder?: string } & FieldHookConfig<string>> = ({ label, placeholder = "", ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.touched && meta.error ? meta.error : '';
  
  return (
    <TextField
      label={label}
      {...field}
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      error={Boolean(errorText)}
      helperText={errorText}
      sx={{ mb: 2 }}
    />
  );
};

export default CustomTextField;
