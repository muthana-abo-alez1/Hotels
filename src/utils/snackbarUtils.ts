import { snackbarRef } from "components/Snackbar/Snackbar";

export const showSnackbar = (
  message: string,
  options: {
    variant?: "alert";
    title: string;
    text: string;
    type: "success" | "error" | "warning" | "info";
  }
) => {
  if (!snackbarRef) {
    console.error("Snackbar reference is not initialized.");
    return;
  }
  snackbarRef.enqueueSnackbar(message, options);
};

export const showSuccessSnackbar = (title: string, text: string) =>
  showSnackbar("Success", { type: "success", title, text, variant: "alert" });

export const showErrorSnackbar = (title: string, text: string) =>
  showSnackbar("Error", { type: "error", title, text, variant: "alert" });

export const showWarningSnackbar = (title: string, text: string) =>
  showSnackbar("Warning", { type: "warning", title, text, variant: "alert" });

export const showInfoSnackbar = (title: string, text: string) =>
  showSnackbar("Info", { type: "info", title, text, variant: "alert" });
