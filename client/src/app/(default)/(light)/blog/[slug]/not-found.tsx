import "@/app/styles/light.scss";
import { appLinks } from "@/shared/constants";
import { Nav } from "@/shared/ui/user";
import { NotFound } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Ошибка, статьи не существует :(`,
  openGraph: {
    title: `Ошибка, статьи не существует :(`,
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
        <Nav theme="light" isSolid />
        <main>
          <NotFound
            theme="light"
            href={{
              text: "Перейти ко всем статьям",
              href: appLinks.user.articles.main,
            }}
            text={
              <>
                <span>Такой статьи не&nbsp;существует.</span>
                <span>
                  Возможно, она была удалена, либо в&nbsp;ссылке допущена ошибка
                </span>
              </>
            }
          />
        </main>
      </body>
    </>
  );
};

export default NotFoundPage;
