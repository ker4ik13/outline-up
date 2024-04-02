import type { Rate as IRate } from "@/shared/types/ui";
import { SharedButton } from "@/shared/ui/user";
import styles from "./Rate.module.scss";

interface Props {
  rate: IRate;
}

export const Rate = ({ rate }: Props) => {
  return (
    <div className={`${styles.rate} ${rate.mostProfitable && styles.big}`}>
      <p className={styles.duration}>{rate.duration}</p>
      <p className={styles.subtitle}>{rate.subtitle}</p>
      <p className={styles.advantages}>{rate.advantages}</p>
      <p className={styles.price}>{`${rate.price.toLocaleString("ru")} Руб`}</p>
      <SharedButton
        href={rate.button.href}
        fullWidth
        variant={rate.mostProfitable ? "secondary" : "primary"}
        className={styles.button}
      >
        {rate.button.text ? rate.button.text : "Купить ключ"}
      </SharedButton>
    </div>
  );
};
