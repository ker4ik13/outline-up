import { SITE_NAME } from "@/shared/constants";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type { DefaultBlockProps } from "@/shared/types/ui";
import styles from "./Steps.module.scss";

interface Step {
  title: string;
  text: string;
}

const initialSteps: Step[] = [
  {
    title: "Скачать Outline",
    text: "Сперва необходимо загрузить приложение Outline на устройство на котором требуется настроить VPN. Приложение можно установить на компьютер, телефон или планшет",
  },
  {
    title: "Купить ключ",
    text: "Для подключения к серверу OUTLINE UP в установленном приложении нужно ввести уникальный цифровой ключ. Вы можете купить ключ доступа на 1, 3 или 12 месяцев",
  },
  {
    title: "Начать пользоваться",
    text: "После ввода ключ сохраняется в памяти приложения, и его не нужно вводить каждый раз. Теперь вы можете включать и отключать VPN когда это требуется всего одной кнопкой",
  },
];

interface Props extends DefaultBlockProps {
  title?: string;
  firstCard?: {
    count: number;
    text: string;
  };
  steps?: Step[];
}

export const Steps = ({
  steps,
  title,
  firstCard,
  isGrayBg,
  rounded,
  className,
}: Props) => {
  return (
    <div
      className={`${styles.stepsBlock} ${getDefaultBlockStyles({
        styles,
        isGrayBg,
        rounded,
        className,
      })}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          {title ? title : `Как пользоваться ${SITE_NAME}?`}
        </h2>
        <div className={styles.steps}>
          <div className={`${styles.step} ${styles.first}`}>
            <p className={styles.firstCount}>
              {firstCard && firstCard.count ? firstCard.count : "3"}
            </p>
            <p className={styles.firstText}>
              {firstCard && firstCard.text ? firstCard.text : "простых шага"}
            </p>
          </div>
          {steps
            ? steps.map((step, index) => (
                <div className={styles.step} key={index}>
                  <p className={styles.count}>{index + 1}</p>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              ))
            : initialSteps.map((step, index) => (
                <div className={styles.step} key={index}>
                  <p className={styles.count}>{index + 1}</p>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
