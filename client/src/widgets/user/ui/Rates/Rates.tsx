"use client";

import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type { DefaultBlockProps, Rate as IRate } from "@/shared/types/ui";
import { Rate } from "@/shared/ui/user";
import { RateModal } from "@/widgets/user/ui/Modals";
import { useState } from "react";
import styles from "./Rates.module.scss";

interface Props extends DefaultBlockProps {
  title?: string;
}

const initialRates: IRate[] = [
  {
    duration: "1 месяц",
    subtitle: "Базовый тариф",
    advantages: "500 Гигабайт трафика в месяц",
    button: {
      href: "#",
    },
    price: 400,
  },
  {
    duration: "3 месяца",
    subtitle: "Выгода 400 рублей",
    advantages: "500 Гигабайт трафика в месяц",
    button: {
      href: "#",
    },
    price: 800,
  },
  {
    duration: "1 год",
    subtitle: "Выгода 3 600 рублей",
    advantages: "1 Терабайт трафика в месяц",
    button: {
      href: "#",
    },
    price: 1200,
    mostProfitable: true,
  },
];

const freeRate: IRate = {
  advantages: "500 Гигабайт трафика",
  button: {
    href: "#",
    text: "",
  },
  price: 0,
  duration: "3 дня",
  subtitle: "Тестовый ключ",
};

export const Rates = ({ isGrayBg, title, rounded, className }: Props) => {
  const [selectedRate, setSelectedRate] = useState<IRate>({} as IRate);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = (rate: IRate) => {
    setIsOpenModal(true);
    setSelectedRate(rate);
    document.body.classList.add("overflow");
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.classList.remove("overflow");
  };

  return (
    <>
      <RateModal
        rate={selectedRate}
        isOpen={isOpenModal}
        closeModal={closeModal}
      />
      <div
        className={`${styles.ratesBlock} ${getDefaultBlockStyles({
          styles,
          isGrayBg,
          rounded,
          className,
        })}`}
        id="buy-key"
      >
        <div className={styles.container}>
          <h2 className={styles.title}>
            {title ? title : <>Купите доступ к&nbsp;VPN прямо сейчас</>}
          </h2>

          {/* PC logic */}
          <div className={styles.rates}>
            {initialRates.map((rate, index) => (
              <Rate rate={rate} key={index} openModal={openModal} />
            ))}
          </div>
          <p className={styles.helpText}>
            или&nbsp;протестируйте работу сервера в&nbsp;течение 3 дней
            бесплатно:
          </p>
          <button
            className={styles.getKeyLink}
            type="button"
            onClick={() => openModal(freeRate)}
          >
            Получить ключ для&nbsp;тестирования
          </button>
        </div>
      </div>
    </>
  );
};
