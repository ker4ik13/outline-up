import type { Rate as IRate } from "@/shared/types/ui";
import { SharedButton } from "@/shared/ui/user";
import styles from "./Rate.module.scss";

interface Props {
  rate: IRate;
  openModal?: (rate: IRate) => void;
  defaultRate?: boolean;
}

export const Rate = ({ rate, defaultRate, openModal }: Props) => {
  return (
    <div
      className={`${styles.rate} ${
        rate.attributes.mostProfitable && !defaultRate ? styles.big : ""
      }`}
    >
      <p className={styles.duration}>{rate.attributes.duration}</p>
      <p className={styles.subtitle}>{rate.attributes.subtitle}</p>
      <p className={styles.advantages}>{rate.attributes.advantages}</p>
      <p className={styles.price}>{`${rate.attributes.price.toLocaleString(
        "ru"
      )} Руб`}</p>
      {!defaultRate && (
        <SharedButton
          fullWidth
          variant={rate.attributes.mostProfitable ? "secondary" : "primary"}
          className={styles.button}
          onClick={() => {
            openModal && openModal(rate);
          }}
        >
          {rate.attributes.button_text
            ? rate.attributes.button_text
            : "Купить ключ"}
        </SharedButton>
      )}
    </div>
  );
};
