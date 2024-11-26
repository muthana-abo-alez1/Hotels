import React from "react";
import { useSnackbar } from "notistack";

export let snackbarRef: ReturnType<typeof useSnackbar>;

const Snackbar: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};
export default Snackbar;
