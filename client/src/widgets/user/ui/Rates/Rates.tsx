"use client";

import { initialRates } from "@/data/user/initialRates";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type { DefaultBlockProps, Rate as IRate } from "@/shared/types/ui";
import { Rate } from "@/shared/ui/user";
import { useState } from "react";
import { RateModal } from "../Modals";
import styles from "./Rates.module.scss";

interface Props extends DefaultBlockProps {
  title?: string;
  data?: IRate[];
}

export const Rates = ({ isGrayBg, title, rounded, className, data }: Props) => {
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
            {data && data.length > 0
              ? data
                  .sort((a, b) => a.attributes.position - b.attributes.position)
                  .map((rate) => {
                    return (
                      <Rate rate={rate} key={rate.id} openModal={openModal} />
                    );
                  })
              : initialRates.initialRates
                  .sort((a, b) => a.attributes.position - b.attributes.position)
                  .map((rate) => (
                    <Rate rate={rate} key={rate.id} openModal={openModal} />
                  ))}
          </div>
          <p className={styles.helpText}>
            или&nbsp;протестируйте работу сервера в&nbsp;течение 3 дней
            бесплатно:
          </p>
          <button
            className={styles.getKeyLink}
            type="button"
            onClick={() => openModal(initialRates.freeRate)}
          >
            Получить ключ для&nbsp;тестирования
          </button>
        </div>
      </div>
    </>
  );
};
