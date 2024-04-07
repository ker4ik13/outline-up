import poster from "@/data/user/source/Header.jpg";
import { Footer, Nav } from "@/shared/ui/user";
import type { Metadata } from "next";
import "../../styles";
import "./styles";

export const metadata: Metadata = {
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
        <Nav theme="light" />
        <main>{children}</main>
        <Footer />
      </body>
    </>
  );
}
