import "@/app/styles";
import s from "@/pages/GeneralPage.module.scss";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <main className={s.main}>{children}</main>
      <ToastContainer containerId={"toast-container"} />
    </body>
  );
}
