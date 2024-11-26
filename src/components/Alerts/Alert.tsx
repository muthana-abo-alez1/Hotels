import { forwardRef } from "react";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { Typography } from "@mui/material";
import { SnackbarContent } from "notistack";
import styles from "./Alert.module.scss";
export type AlertOptions = {
  title: string;
  type: AlertColor;
  text: string;
};
type AlertProps = AlertOptions;
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ title, type, text }, ref) => {
    return (
      <SnackbarContent ref={ref}>
        <MuiAlert
          severity={type}
          variant="filled"
          className={styles.alertContainer}
        >
          <Typography className={styles.alertTitle}>{title}</Typography>
          {text}
        </MuiAlert>
      </SnackbarContent>
    );
  }
);
Alert.displayName = "Alert";
export default Alert;