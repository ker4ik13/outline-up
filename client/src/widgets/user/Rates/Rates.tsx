"use client";

import type { Rate as IRate } from "@/shared/types/ui";
import { useState } from "react";
import { Rate } from "../Rate/Rate";
import styles from "./Rates.module.scss";

interface Props {
  title?: string;
  isGrayBg?: boolean;
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
  },
];

export const Rates = ({ isGrayBg, title }: Props) => {
  const [selectedRate, setSelectedRate] = useState(0);

  return (
    <div className={`${styles.ratesBlock} ${isGrayBg && styles.gray}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {title ? title : "Купите доступ к VPN прямо сейчас"}
        </h2>
        {/* Mobile logic */}
        {/* <div className={styles.selectRateBlock}>
          <button
            type="button"
            className={`${styles.selectRateButton} ${
              selectedRate === 0 && styles.selected
            }`}
            onClick={() => setSelectedRate(0)}
          >
            1 мес
          </button>
          <button
            type="button"
            className={`${styles.selectRateButton} ${
              selectedRate === 1 && styles.selected
            }`}
            onClick={() => setSelectedRate(1)}
          >
            3 мес
          </button>
          <button
            type="button"
            className={`${styles.selectRateButton} ${
              selectedRate === 2 && styles.selected
            }`}
            onClick={() => setSelectedRate(2)}
          >
            12 мес
          </button>
        </div>
        <div className={styles.rates}>
          <Rate rate={initialRates[selectedRate]} isBig={selectedRate === 1} />
        </div> */}

        {/* PC logic */}
        <div className={styles.rates}>
          {initialRates.map((rate, index) => (
            <Rate rate={rate} key={index} isBig={index === 1} />
          ))}
        </div>
      </div>
    </div>
  );
};
