import { appLinks } from "@/shared/constants";
import { Rate } from "@/shared/types/ui";

interface InitialRates {
  initialRates: Rate[];
  freeRate: Rate;
}

export const initialRates: InitialRates = {
  initialRates: [
    {
      id: 1,
      attributes: {
        duration: "1 месяц",
        subtitle: "Базовый тариф",
        advantages: "500 Гигабайт трафика в месяц",
        price: 400,
        button_href: appLinks.other.tgBot,
        createdAt: "2022-03-07T10:00:00.000Z",
        publishedAt: "2022-03-07T10:00:00.000Z",
        position: 1,
        button_text: "Купить ключ",
        mostProfitable: false,
      },
    },
    {
      id: 1,
      attributes: {
        duration: "3 месяца",
        subtitle: "Выгода 400 рублей",
        advantages: "500 Гигабайт трафика в месяц",
        price: 800,
        button_href: appLinks.other.tgBot,
        createdAt: "2022-03-07T10:00:00.000Z",
        publishedAt: "2022-03-07T10:00:00.000Z",
        position: 3,
        button_text: "Купить ключ",
        mostProfitable: false,
      },
    },
    {
      id: 1,
      attributes: {
        duration: "1 год",
        subtitle: "Выгода 3 600 рублей",
        advantages: "1 Терабайт трафика в месяц",
        price: 1200,
        button_href: appLinks.other.tgBot,
        createdAt: "2022-03-07T10:00:00.000Z",
        publishedAt: "2022-03-07T10:00:00.000Z",
        position: 2,
        button_text: "Купить ключ",
        mostProfitable: true,
      },
    },
  ],
  freeRate: {
    id: 9999,
    attributes: {
      position: 0,
      createdAt: "2022-03-07T10:00:00.000Z",
      publishedAt: "2022-03-07T10:00:00.000Z",
      advantages: "500 Гигабайт трафика",
      button_text: "",
      button_href: appLinks.other.tgBot,
      price: 0,
      duration: "3 дня",
      subtitle: "Тестовый ключ",
    },
  },
};
