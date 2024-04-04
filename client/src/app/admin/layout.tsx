"use client";

import favicon from "@/data/admin/favicon.svg";
import { AuthProvider } from "@/shared/helpers/auth";
import { store } from "@/shared/store";
import "@fontsource/inter";
import { Provider } from "react-redux";
import "../styles";
import ThemeRegistry from "./ThemeRegistry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeRegistry
          options={{
            key: "joy",
          }}
        >
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="eaf2fb"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="18191b"
          />
          <title>Админ панель</title>
          <meta property="og:title" content="Админ панель"></meta>
          <meta property="og:description" content="Админ панель"></meta>
          <meta name="description" content="Админ панель"></meta>
          <meta property="og:type" content="website"></meta>
          <link rel="shortcut icon" href={favicon.src} />
          {children}
        </ThemeRegistry>
      </AuthProvider>
    </Provider>
  );
}
