import { possibilities } from "@/data/user/possibilities";
import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import poster from "@/data/user/source/Header.jpg";
import { CLIENT_URL, SITE_NAME } from "@/shared/constants";

import {
  Accordions,
  MainScreen,
  Rates,
  Steps,
  TextCards,
  TextWithButton,
} from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME}: Ваш безопасный VPN для свободного доступа в Интернет`,
  description:
    "Получите надежный доступ к интернету без ограничений с Outline Up - VPN сервером на базе сервиса Outline от Jigsaw. Гарантированная активация и мгновенное получение ключа!",
  keywords:
    "VPN, Outline Up, безопасный доступ в интернет, гарантированная активация, мгновенное получение, свободный доступ в сеть, без ограничений, защищенное соединение, сервер VPN, сервис Outline, Jigsaw, ключ доступа, анонимный доступ, защита данных, приватность онлайн, интернет-безопасность, онлайн-приватность, защищенный интернет, онлайн-анонимность, шифрование трафика, обход блокировок, безопасная сеть, анонимный серфинг, конфиденциальность в интернете, защита от слежки, защита Wi-Fi, безопасное подключение, защита онлайн-активности, защищенный VPN, доступ к заблокированным сайтам, защита личной информации",
  openGraph: {
    title: `${SITE_NAME}: Ваш безопасный VPN для свободного доступа в Интернет`,
    description:
      "Получите надежный доступ к интернету без ограничений с Outline Up - VPN сервером на базе сервиса Outline от Jigsaw. Гарантированная активация и мгновенное получение ключа!",
    type: "website",
    siteName: SITE_NAME,
    url: `${CLIENT_URL}/`,
    images: [poster.src],
  },
  alternates: {
    canonical: `${CLIENT_URL}/`,
    languages: {
      ru: `${CLIENT_URL}/`,
    },
  },
};

const UserMainPage = () => {
  return (
    <>
      <MainScreen />
      <TextWithButton
        isGrayBg
        rounded={{
          top: true,
        }}
      />
      <Steps />
      <Accordions accordions={possibilities} isGrayBg />
      <Rates />
      <TextCards isGrayBg />
      <Accordions title="Вопросы и ответы" accordions={questionsAndAnswers} />
    </>
  );
};

export default UserMainPage;
