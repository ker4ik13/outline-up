import poster from "@/data/user/source/Header.jpg";
import { Footer, Nav } from "@/shared/ui/user";
import { Metadata } from "next";
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
        <Nav isSolid theme="dark" />
        <main>{children}</main>
        <Footer />
      </body>
    </>
  );
}
