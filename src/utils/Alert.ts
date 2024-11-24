import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

const ALERT_TIMER = 2_000;
const ALERT_WIDTH = 700;

const showAlert = (
  text: string,
  title: string,
  icon: SweetAlertIcon,
  options?: Partial<SweetAlertOptions>
) => {
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
      htmlContainer: "text-center title me-0 ms-0 overflow-visible"
    },
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
) => showAlert(text, title ?? 'succes', "success", options);

export const showFailureAlert = (
  text: string,
  title?: string,
  options?: Partial<SweetAlertOptions>
) => showAlert(text, title ?? "failure", "error", options);
