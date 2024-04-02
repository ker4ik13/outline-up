import { SITE_NAME } from "@/shared/constants";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type { DefaultBlockProps, TextCard } from "@/shared/types/ui";
import Link from "next/link";
import styles from "./TextCards.module.scss";
interface Props extends DefaultBlockProps {
  title?: string;
  cards?: TextCard[];
}

const initialCards: TextCard[] = [
  {
    title: "Лучшая цена",
    description:
      "Мы сотрудничаем с крупнейшими хостинг-провайдерами. Это обеспечивает выгодные условия аренды серверов, и гарантирует их стабильную работу",
  },
  {
    title: "Мгновенное получение",
    description:
      "Отправим ключ на вашу электронную почту сразу же после успешной оплаты любым удобным для вас способом",
  },
  {
    title: "Гарантия активации",
    description:
      "Мы на 100% гарантируем, что купленный у нас ключ будет успешно активирован и полностью готов к работе",
  },
];

export const TextCards = ({
  isGrayBg,
  rounded,
  title,
  cards,
  className,
}: Props) => {
  return (
    <div
      className={`${styles.textCardsBlock} ${getDefaultBlockStyles({
        styles,
        isGrayBg,
        rounded,
        className,
      })}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          {title ? title : `Гарантии ${SITE_NAME}`}
        </h2>
        <div className={styles.cards}>
          {cards
            ? cards.map((card, index) => (
                <div className={styles.card} key={index}>
                  <p className={styles.cardTitle}>{card.title}</p>
                  <p className={styles.cardText}>{card.description}</p>
                </div>
              ))
            : initialCards.map((card, index) => (
                <div className={styles.card} key={index}>
                  <p className={styles.cardTitle}>{card.title}</p>
                  <p className={styles.cardText}>{card.description}</p>
                </div>
              ))}
        </div>
        <p className={styles.helpText}>
          Если у вас возникнут проблемы с установкой и настройкой приложения –
          напишите нам через{" "}
          <Link href="#" target="_blank">
            форму обратной связи
          </Link>{" "}
          или в Telegram. Мы поможем вам настроить VPN на вашем устройстве, а
          если не получится – вернём деньги
        </p>
      </div>
    </div>
  );
};
