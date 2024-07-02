"use client";

import type { Meta } from "@/shared/types/meta";
import { SharedButton, SharedInput } from "@/shared/ui/user";
import { useState } from "react";
import styles from "./PagePeeker.module.scss";

interface PagePeekerProps {
  title?: string;
  buttonText?: string;
  meta: Meta;
  closeModal: () => void;
}

export const PagePeeker = ({
  title,
  buttonText,
  meta,
  closeModal,
}: PagePeekerProps) => {
  const [value, setValue] = useState<number | "">("");
  const [isValid, setIsValid] = useState(false);

  const validateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Если впереди 0, то убираем его
    if (event.target.value[0] === "0" || event.target.value[0] === "-") {
      event.target.value = event.target.value.slice(1);
    }
    const eventValue = Number(event.target.value);
    if (Number.isNaN(eventValue)) {
      setIsValid(false);
      return;
    }

    setValue(eventValue);
    // Если значение меньше 1 или больше количества страниц
    if (eventValue < 1 || eventValue > meta.pagination.pageCount) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  };

  return (
    <div className={styles.pagePeeker}>
      <div className={styles.container}>
        <p className={styles.title}>
          {title ? title : "На какую страницу хотите перейти ?"}
        </p>
        <SharedInput
          value={value}
          onChange={validateValue}
          max={meta.pagination.pageCount}
          min={1}
          placeholder="Укажите номер страницы"
        />
        {!isValid ? (
          <SharedButton type="button" fullWidth>
            {buttonText ? buttonText : "Перейти"}
          </SharedButton>
        ) : (
          <SharedButton
            href={{
              query: {
                page: value,
              },
            }}
            onClick={() => closeModal()}
            fullWidth
          >
            {buttonText ? buttonText : "Перейти"}
          </SharedButton>
        )}
      </div>
    </div>
  );
};
