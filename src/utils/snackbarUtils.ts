import { snackbarRef } from "components/Snackbar/Snackbar";
import { SnackbarType } from "types/SnackbarType";

export const Snackbar = (
  message: string,
  options: {
    variant?: "alert";
    title: string;
    text: string;
    type: SnackbarType;
  }
) => {
  if (!snackbarRef) {
    console.error("Snackbar reference is not initialized.");
    return;
  }
  snackbarRef.enqueueSnackbar(message, options);
};

export const showSuccessSnackbar = (title: string, text: string) =>
  Snackbar("Success", { type: "success", title, text, variant: "alert" });

export const showErrorSnackbar = (title: string, text: string) =>
  Snackbar("Error", { type: "error", title, text, variant: "alert" });

export const showWarningSnackbar = (title: string, text: string) =>
  Snackbar("Warning", { type: "warning", title, text, variant: "alert" });

export const showInfoSnackbar = (title: string, text: string) =>
  Snackbar("Info", { type: "info", title, text, variant: "alert" });

export const showSnackbar = (title: string, text: string , type:SnackbarType) =>
  Snackbar(title, { type: type, title, text, variant: "alert" });