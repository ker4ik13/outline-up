import { Nav } from "@/shared/ui/user";
import { NotFound } from "@/widgets/user/ui";
import { type Metadata } from "next";
import "./styles/dark.scss";

export const metadata: Metadata = {
  title: `Ошибка, страницы не существует :(`,
  openGraph: {
    title: `Ошибка, страницы не существует :(`,
  },
};

const NotFoundPage = () => {
  return (
    <>
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
      <body>
        <Nav theme="dark" isSolid />
        <main>
          <NotFound />
        </main>
      </body>
    </>
  );
};

export default NotFoundPage;
