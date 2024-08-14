import { appLinks, SITE_NAME } from "@/shared/constants";
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
    description: (
      <>
        Мы сотрудничаем с&nbsp;крупнейшими хостинг-провайдерами. Это
        обеспечивает выгодные условия аренды серверов, и&nbsp;гарантирует
        их&nbsp;стабильную работу
      </>
    ),
  },
  {
    title: "Мгновенное получение",
    description: (
      <>
        Моментально выдадим ключ в&nbsp;Telegram-боте сразу&nbsp;же после
        успешной оплаты любым удобным для&nbsp;вас способом
      </>
    ),
  },
  {
    title: "Гарантия активации",
    description: (
      <>
        Мы на&nbsp;100% гарантируем, что&nbsp;купленный у&nbsp;нас ключ будет
        успешно активирован и&nbsp;полностью готов к&nbsp;работе
      </>
    ),
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
          Если у&nbsp;вас возникнут проблемы с&nbsp;установкой и&nbsp;настройкой
          приложения – напишите нам в&nbsp;
          <Link href={appLinks.other.tgSupport} target="_blank">
            Telegram
          </Link>
          . Мы поможем вам настроить VPN на&nbsp;вашем устройстве, а&nbsp;если
          не&nbsp;получится – вернём деньги
        </p>
      </div>
    </div>
  );
};
