import { toast, ToastOptions, type ToastPromiseParams } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "../Notification.module.scss";

export const showAsyncNotification = (
  callback: Promise<unknown>,
  params: ToastPromiseParams,
  options?: ToastOptions
) => {
  toast.promise(
    callback,
    {
      pending: {
        className: s.notification,
        theme: options?.theme,
      },
      error: {
        className: s.notification,
        autoClose: options?.autoClose || 2000,
        theme: options?.theme,
      },
      success: {
        className: s.notification,
        autoClose: options?.autoClose || 2000,
        theme: options?.theme,
      },
      ...params,
    },
    {
      position: "bottom-right",
    }
  );
};
