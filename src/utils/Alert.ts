import { useTheme as MuiUseTheme } from "@mui/material/styles"; 
import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

const ALERT_TIMER = 3000;
const ALERT_WIDTH = 500;

const showAlert = (
  text: string,
  title: string,
  icon: SweetAlertIcon,
  options?: Partial<SweetAlertOptions>
) => {
  const theme = MuiUseTheme(); 

  const alertOptions: SweetAlertOptions = {
    position: "center",
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: ALERT_TIMER,
    width: ALERT_WIDTH,
    showCancelButton: true,
    cancelButtonText: "Hide",
    customClass: {
      title: "text-center title",
      htmlContainer: "text-center title me-0 ms-0 overflow-visible",
    },
    background: theme.palette.background.paper, 
    color: theme.palette.text.primary,          
  };

  Swal.fire({
    ...alertOptions,
    ...options,
  } as SweetAlertOptions);
};

export const showSuccessAlert = (
  text: string,
  title?: string,
  options?: Partial<SweetAlertOptions>
) => showAlert(text, title ?? "Success", "success", options);

export const showFailureAlert = (
  text: string,
  title?: string,
  options?: Partial<SweetAlertOptions>
) => showAlert(text, title ?? "Failure", "error", options);
