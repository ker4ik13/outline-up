import favicon128 from "@/data/images/favicon/favicon-128x128.png";
import favicon32 from "@/data/images/favicon/favicon-32x32.png";
import favicon64 from "@/data/images/favicon/favicon-64x64.png";
import faviconSvg from "@/data/images/favicon/favicon.svg";
import poster from "@/data/user/source/Header.jpg";
import type { Metadata } from "next";
import "./styles";

export const metadata: Metadata = {
  creator: "ker4ik13",
  icons: [
    {
      url: faviconSvg.src,
      type: "image/svg+xml",
      sizes: "32x32",
    },
    {
      url: favicon32.src,
      type: "image/png",
      sizes: "32x32",
    },
    {
      url: favicon64.src,
      type: "image/png",
      sizes: "64x64",
    },
    {
      url: favicon128.src,
      type: "image/png",
      sizes: "128x128",
    },
  ],
  openGraph: {
    images: [poster.src],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <meta name="color-scheme" content="only light" />
      {children}
    </html>
  );
}
