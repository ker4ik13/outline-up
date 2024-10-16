import { Footer, Nav } from "@/shared/ui/user";
import "../../styles";
import "./styles";

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
      <body>
        <Nav theme="dark" />
        <main>{children}</main>
        <Footer />
      </body>
    </>
  );
}
