"use client";

import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type { DefaultBlockProps, Rate as IRate } from "@/shared/types/ui";
import { Rate } from "@/shared/ui/user";
import Link from "next/link";
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

export const Rates = ({ isGrayBg, title, rounded, className }: Props) => {
  return (
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
            <Rate rate={rate} key={index} />
          ))}
        </div>
        <p className={styles.helpText}>
          или&nbsp;протестируйте работу сервера в&nbsp;течение 3 дней бесплатно:
        </p>
        <Link className={styles.getKeyLink} href="#">
          Получить ключ для&nbsp;тестирования
        </Link>
      </div>
    </div>
  );
};
