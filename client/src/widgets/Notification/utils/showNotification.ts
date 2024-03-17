import { toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "../Notification.module.scss";

export const showNotification = (text: string, options?: ToastOptions) => {
  toast(text, {
    className: s.notification,
    position: "bottom-right",
    theme: options?.theme,
    type: options?.type || "info",
    autoClose: options?.autoClose,
    hideProgressBar: options?.hideProgressBar,
    containerId: "toast-container",
  });
};
