"use client";

import { appLinks } from "@/shared/constants";
import { closeModalOnEscape } from "@/shared/helpers";
import type { Rate as IRate } from "@/shared/types/ui";
import { Rate, SharedButton } from "@/shared/ui/user";
import { CloseIcon } from "@/shared/ui/user/icons";
import { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import styles from "./RateModal.module.scss";

interface Props {
  rate: IRate;
  isOpen: boolean;
  closeModal: () => void;
}

const isOpenStyles = (isOpen: boolean) =>
  isOpen ? `${styles.screen} ${styles.open}` : `${styles.screen}`;

export const RateModal = ({ rate, isOpen, closeModal }: Props) => {
  useEffect(() => {
    document.addEventListener("keydown", (event) =>
      closeModalOnEscape(event, closeModal)
    );
    return () =>
      document.removeEventListener("keydown", (event) =>
        closeModalOnEscape(event, closeModal)
      );
  }, []);

  const [{ y }, set] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(({ down, movement: [, my] }) => {
    if (typeof window !== "undefined" && window.innerWidth > 768) return;

    if (down) {
      // Если свайп вверх, блокируем скролл
      if (my < 0) return;
      set({ y: my });
    } else {
      // Если свайп вниз достаточно значителен, закрываем попап
      if (my > 200) closeModal();
      set({ y: 0 });
    }
  });

  return (
    <div className={isOpenStyles(isOpen)} onClick={closeModal}>
      <div
        className={styles.container}
        onClick={(event) => event.stopPropagation()}
      >
        <animated.div
          {...bind()}
          style={{
            transform: !isOpen
              ? "translateY(100%)"
              : y.to((y) => `translateY(${y}px)`),
          }}
          className={styles.modal}
        >
          <button type="button" className={styles.closeDragButton}>
            <div></div>
          </button>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeModal}
          >
            <CloseIcon className={styles.closeIcon} />
          </button>
          <p className={styles.modalTitle}>Подтвердите действие</p>
          <div className={styles.content}>
            {rate && rate.duration && (
              <div className={styles.rate}>
                <Rate rate={rate} defaultRate />
              </div>
            )}
            <div className={styles.divider}></div>
            <div className={styles.text}>
              {rate.price === 0 ? (
                <p>
                  Для новых пользователей сервиса мы&nbsp;предусмотрели
                  возможность протестировать качество сервера Outline&nbsp;Up
                  перед покупкой
                </p>
              ) : (
                <p>
                  Вы намереваетесь произвести покупку ключа доступа
                  к&nbsp;серверу Outline&nbsp;Up сроком на&nbsp;
                  {rate.duration}
                </p>
              )}
              <br />
              <p>
                В&nbsp;настоящий момент получение тестового ключа возможно
                только в&nbsp;нашем Telegram-боте «OutlineUpBot»
              </p>
              <br />
              <p>
                После нажатия на&nbsp;кнопку «Продолжить» вы&nbsp;будете
                перенаправлены в&nbsp;приложение Telegram
              </p>
              <br />
              <p>
                Для осуществления покупки будет необходимо зарегистрироваться
                и&nbsp;указать действующий номер телефона
              </p>
              <SharedButton
                href={appLinks.other.tgBot}
                target="_blank"
                className={styles.button}
              >
                Продолжить
              </SharedButton>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};
