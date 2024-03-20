"use client";

import { SITE_NAME } from "@/shared/constants";
import type {
  DefaultBlockProps,
  Accordion as IAccordion,
} from "@/shared/types/ui";
import { Accordion } from "@/shared/ui/user";
import { useState } from "react";
import styles from "./Accordions.module.scss";

interface Props extends DefaultBlockProps {
  title?: string;
  accordions?: IAccordion[];
}

const initialAccordions: IAccordion[] = [
  {
    title: "Высокая производительность и скорость",
    content:
      "Подчеркните, что ваш собственный сервер Outline VPN обеспечивает повышенную конфиденциальность и безопасность данных пользователей. Это происходит благодаря возможности контролировать свой сервер и обеспечивать его высокий уровень защиты.",
  },
  {
    title: "Доступ к VPN серверу для вас и ваших близких",
    content:
      "Подчеркните, что ваш собственный сервер Outline VPN обеспечивает повышенную конфиденциальность и безопасность данных пользователей. Это происходит благодаря возможности контролировать свой сервер и обеспечивать его высокий уровень защиты.",
  },
  {
    title: "Поддержка множества устройств и платформ",
    content:
      "Подчеркните, что ваш собственный сервер Outline VPN обеспечивает повышенную конфиденциальность и безопасность данных пользователей. Это происходит благодаря возможности контролировать свой сервер и обеспечивать его высокий уровень защиты.",
  },
  {
    title: "Обход цензуры и географических ограничений",
    content:
      "Подчеркните, что ваш собственный сервер Outline VPN обеспечивает повышенную конфиденциальность и безопасность данных пользователей. Это происходит благодаря возможности контролировать свой сервер и обеспечивать его высокий уровень защиты.",
  },
  {
    title: "Повышенная конфиденциальность и безопасность",
    content:
      "Подчеркните, что ваш собственный сервер Outline VPN обеспечивает повышенную конфиденциальность и безопасность данных пользователей. Это происходит благодаря возможности контролировать свой сервер и обеспечивать его высокий уровень защиты.",
  },
  {
    title: "Отсутствие логирования активности",
    content:
      "Подчеркните, что ваш собственный сервер Outline VPN обеспечивает повышенную конфиденциальность и безопасность данных пользователей. Это происходит благодаря возможности контролировать свой сервер и обеспечивать его высокий уровень защиты.",
  },
];

export const Accordions = ({ accordions, title, isGrayBg, rounded }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number | null) => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      if (index === openIndex) {
        setOpenIndex(null);
        return;
      }
    }

    setOpenIndex(index);
  };

  return (
    <div
      className={`${styles.accordionBlock} ${isGrayBg && styles.gray} ${
        rounded && rounded.top && styles.roundedTop
      } ${rounded && rounded.bottom && styles.roundedBottom}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          {title ? title : `Используя ${SITE_NAME} вы получаете`}
        </h2>
        <div className={styles.accordions}>
          {accordions
            ? accordions.map((accordion, index) => (
                <Accordion
                  title={accordion.title}
                  content={accordion.content}
                  key={index}
                  isOpen={openIndex === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))
            : initialAccordions.map((accordion, index) => (
                <Accordion
                  title={accordion.title}
                  content={accordion.content}
                  key={index}
                  isOpen={openIndex === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
