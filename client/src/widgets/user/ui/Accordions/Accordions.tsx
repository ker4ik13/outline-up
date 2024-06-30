"use client";

import { possibilities } from "@/data/user/possibilities";
import { SITE_NAME } from "@/shared/constants";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type {
  DefaultBlockProps,
  Accordion as IAccordion,
} from "@/shared/types/ui";
import { Accordion } from "@/shared/ui/user";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import styles from "./Accordions.module.scss";

interface Props extends DefaultBlockProps {
  title?: string;
  mainTitle?: boolean;
  accordions?: IAccordion[];
  lowerPadding?: boolean;
  moreText?: string;
}

export const Accordions = ({
  accordions,
  title,
  isGrayBg,
  rounded,
  className,
  lowerPadding,
  moreText,
  mainTitle = false,
}: Props) => {
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
      className={`${styles.accordionBlock} ${getDefaultBlockStyles({
        styles,
        isGrayBg,
        rounded,
        className,
      })} ${lowerPadding && styles.lowerPadding}`}
    >
      <div className={styles.container}>
        {mainTitle ? (
          <h1 className={styles.mainTitle}>{title}</h1>
        ) : (
          <h2 className={styles.title}>
            {title ? title : `Используя ${SITE_NAME} вы получаете`}
          </h2>
        )}
        <div className={styles.accordions}>
          {accordions
            ? accordions.map((accordion, index) => (
                <Accordion
                  title={accordion.title}
                  content={accordion.content}
                  key={accordion.id}
                  id={accordion.id}
                  isOpen={openIndex === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))
            : possibilities.map((accordion, index) => (
                <Accordion
                  title={accordion.title}
                  content={accordion.content}
                  key={accordion.id}
                  id={accordion.id}
                  isOpen={openIndex === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))}
        </div>
        {moreText && (
          <div className={styles.moreText}>
            {/* Конвертация в HTML из Markdown */}
            <Markdown>{moreText}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};
