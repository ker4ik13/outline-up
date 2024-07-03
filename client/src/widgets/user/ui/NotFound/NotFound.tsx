import { appLinks } from "@/shared/constants";
import Link from "next/link";
import styles from "./NotFound.module.scss";

interface Props {
  code?: number;
  text?: string | React.ReactNode;
  href?: {
    text?: string;
    href?: string;
  };
  theme?: "dark" | "light";
}

export const NotFound = ({ code, href, text, theme = "dark" }: Props) => {
  return (
    <div
      className={`${styles.notFound} ${
        theme === "light" ? styles.lightBg : styles.darkBg
      }`}
    >
      <p className={styles.code}>{code ? code : 404}</p>
      <p className={styles.text}>
        {text ? (
          text
        ) : (
          <>
            <span>Такой страницы не&nbsp;существует.</span>
            <span>
              Возможно, она была удалена, либо в&nbsp;ссылке допущена ошибка
            </span>
          </>
        )}
      </p>
      <Link
        href={href && href.href ? href.href : appLinks.user.main}
        className={styles.link}
      >
        {href && href.text ? href.text : "Перейти на главную страницу"}
      </Link>
    </div>
  );
};
