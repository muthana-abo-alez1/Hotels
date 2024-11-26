import React from "react";
import { useSnackbar } from "notistack";

export let snackbarRef: ReturnType<typeof useSnackbar>;

export const Snackbar: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};
