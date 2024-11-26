import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import { SnackbarProvider } from "notistack";
import { MAX_SNACKBARS_ALLOWED, SNACKBAR_AUTO_HIDE_DURATION } from "constants/Generals";
import Alert,{ AlertOptions } from "components/Alerts/Alert";
import Snackbar from "components/Snackbar";

declare module "notistack" {
  interface VariantOverrides {
    alert: AlertOptions;
  }
}
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider
      autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
      maxSnack={MAX_SNACKBARS_ALLOWED}
      Components={{ alert: Alert }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <BrowserRouter>
        <AuthProvider>
          <ThemeProviderWrapper>
            <Snackbar />
            <CssBaseline />
            <App />
          </ThemeProviderWrapper>
        </AuthProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
