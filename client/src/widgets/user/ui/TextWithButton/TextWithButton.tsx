"use client";

import { initialRates } from "@/data/user/initialRates";
import { appLinks } from "@/shared/constants";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type { DefaultBlockProps } from "@/shared/types/ui";
import { SharedButton } from "@/shared/ui/user";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { RateModal } from "../Modals";
import styles from "./TextWithButton.module.scss";

interface Props extends DefaultBlockProps {
  title?: string;
  text?: string | ReactNode;
  button_text?: string;
  link?: {
    text: string;
    href: string;
  };
}

export const TextWithButton = ({
  text,
  title,
  button_text = "Попробовать бесплатно",
  link = {
    text: "Купить ключ доступа",
    href: appLinks.user.buy.main,
  },
  isGrayBg,
  rounded,
  className,
}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
    document.body.classList.add("overflow");
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.classList.remove("overflow");
  };
  return (
    <>
      <RateModal
        isOpen={isOpenModal}
        closeModal={closeModal}
        rate={initialRates.freeRate}
      />
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
          <div className={styles.buttonWrapper}>
            <SharedButton
              // variant="secondary"
              fullWidth
              center
              onClick={openModal}
            >
              {button_text}
            </SharedButton>
          </div>

          {link && link.text && (
            <Link href={link.href} className={styles.link}>
              {link.text}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
