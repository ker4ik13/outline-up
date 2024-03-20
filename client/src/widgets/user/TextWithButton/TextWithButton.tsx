import { appLinks } from "@/shared/constants";
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
  button,
  link,
  isGrayBg,
  rounded,
}: Props) => {
  return (
    <div
      className={`${styles.textBlock} ${isGrayBg && styles.gray} ${
        rounded && rounded.top && styles.roundedTop
      } ${rounded && rounded.bottom && styles.roundedBottom}`}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title ? title : "Свободный доступ в интернет без границ"}
        </h1>
        <div className={styles.textWrapper}>
          {text ? (
            text
          ) : (
            <>
              <p className={styles.text}>
                OUTLINE UP – это VPN сервер на базе сервиса Outline,
                разработанного компанией Jigsaw. Его цель – обеспечить
                безопасный доступ к Интернету для организаций и физических лиц,
                а также дать возможность обхода блокировок.
              </p>
              <p className={styles.text}>
                Для подключения к серверу требуется приобрести ключ доступа
              </p>
            </>
          )}
        </div>
        {button && (
          <div className={styles.buttonWrapper}>
            <SharedButton href={appLinks.user.buy.main} fullWidth center>
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
