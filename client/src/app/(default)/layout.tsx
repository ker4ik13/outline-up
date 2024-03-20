import { Footer, Nav } from "@/widgets/user";
import "../styles";

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
        content="000000"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="000000"
      />
      <meta name="color-scheme" content="only light" />
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
