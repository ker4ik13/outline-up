"use client";

import { closeModalOnEscape } from "@/shared/helpers";
import { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import styles from "./RoundModal.module.scss";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
}

const isOpenStyles = (isOpen: boolean) =>
  isOpen ? `${styles.screen} ${styles.open}` : `${styles.screen}`;

export const RoundModal = ({ children, isOpen, closeModal }: Props) => {
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
      if (my > 100) closeModal();
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
          <div className={styles.content}>
            {children}
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
            >
              Отмена
            </button>
          </div>
        </animated.div>
      </div>
    </div>
  );
};
