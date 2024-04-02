import iconWebp from "@/data/images/favicon/icon.webp";
import { Footer, Nav } from "@/shared/ui/user";
import type { Metadata } from "next";
import "../../styles";
import "./styles";

export const metadata: Metadata = {
  creator: "ker4ik13",
  icons: {
    icon: iconWebp.src,
    href: iconWebp.src,
    apple: iconWebp.src,
    shortcut: iconWebp.src,
    other: {
      url: iconWebp.src,
      type: "image/webp",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="FAFAFA"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="FAFAFA"
      />
      <meta name="color-scheme" content="only light" />
      <body>
        <Nav theme="light" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
