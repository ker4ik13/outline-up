import { Nav } from "@/shared/ui/user";
import { NotFound } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Ошибка, страницы не существует :(`,
  openGraph: {
    title: `Ошибка, страницы не существует :(`,
  },
};

const NotFoundPage = () => {
  return (
    <>
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
