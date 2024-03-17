"use client";

import "@/app/styles";
import s from "@/pages/GeneralPage.module.scss";
import { useAuth } from "@/shared/helpers/auth";
import { Header } from "@/widgets/Header/Header";
import { CircularProgress, Stack } from "@mui/joy";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LoginPage from "../(unauthorized)/auth/signin/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, isLoading, user, getUser } = useAuth();

  useEffect(() => {
    if (!isAuth || !user) {
      getUser();
    }
  }, [user]);

  return (
    <body>
      {/* Если */}
      {!isAuth && !user && isLoading && (
        <>
          <main className={s.main}>
            <Stack
              sx={{ height: "100vh", width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={"background.body"}
            >
              <CircularProgress size="lg" color="primary" />
            </Stack>
          </main>
        </>
      )}

      {!isAuth && !user && !isLoading && (
        <>
          <main className={s.main}>
            <LoginPage />
          </main>
          <ToastContainer containerId={"toast-container"} />
        </>
      )}

      {isAuth && !isLoading && user && (
        <>
          <Header />
          <main className={s.main}>{children}</main>
          <ToastContainer containerId={"toast-container"} />
        </>
      )}
    </body>
  );
}
