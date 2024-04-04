import { appLinks } from "@/shared/constants";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type { DefaultBlockProps } from "@/shared/types/ui";
import { SharedButton } from "@/shared/ui/user";
import Link from "next/link";
import { type ReactNode } from "react";
import styles from "./TextWithButton.module.scss";

interface Props extends DefaultBlockProps {
  title?: string;
  text?: string | ReactNode;
  button?: {
    text: string;
    href: string;
  };
  link?: {
    text: string;
    href: string;
  };
}

export const TextWithButton = ({
  text,
  title,
  button = {
    href: appLinks.user.buy.main,
    text: "Попробовать бесплатно",
  },
  link = {
    text: "Купить ключ доступа",
    href: appLinks.user.buy.main,
  },
  isGrayBg,
  rounded,
  className,
}: Props) => {
  return (
    <div
      className={`${styles.textBlock} ${getDefaultBlockStyles({
        styles,
        isGrayBg,
        rounded,
        className,
      })}`}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title ? title : <>Безопасный доступ в интернет без&nbsp;границ</>}
        </h1>
        <div className={styles.textWrapper}>
          {text ? (
            text
          ) : (
            <>
              <p className={styles.text}>
                Outline Up – это VPN сервер на&nbsp;базе сервиса Outline,
                разработанного компанией Jigsaw. Его цель – обеспечить
                безопасный доступ к&nbsp;Интернету для&nbsp;организаций
                и&nbsp;физических лиц
              </p>
              <p className={styles.text}>
                Для подключения к серверу требуется приобрести ключ доступа
              </p>
            </>
          )}
        </div>
        {button && (
          <div className={styles.buttonWrapper}>
            <SharedButton
              href={appLinks.user.buy.main}
              // variant="secondary"
              fullWidth
              center
            >
              {button.text}
            </SharedButton>
          </div>
        )}

        {link && link.text && (
          <Link href={link.href} className={styles.link}>
            {link.text}
          </Link>
        )}
      </div>
    </div>
  );
};
