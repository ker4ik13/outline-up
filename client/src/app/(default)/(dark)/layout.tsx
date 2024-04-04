import faviconSvg from "@/data/images/favicon/favicon.svg";
import { Footer, Nav } from "@/shared/ui/user";
import type { Metadata } from "next";
import "../../styles";
import "./styles";

export const metadata: Metadata = {
  creator: "ker4ik13",
  icons: {
    icon: faviconSvg.src,
    href: faviconSvg.src,
    apple: faviconSvg.src,
    shortcut: faviconSvg.src,
    other: {
      url: faviconSvg.src,
      type: "image/svg+xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
        <Nav isSolid theme="dark" />
        <main>{children}</main>
        <Footer />
      </body>
    </>
  );
}
