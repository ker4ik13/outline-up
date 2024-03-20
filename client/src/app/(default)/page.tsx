import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import { appLinks, SITE_NAME } from "@/shared/constants";
import {
  Accordions,
  MainScreen,
  Rates,
  Steps,
  TextCards,
  TextWithButton,
} from "@/widgets/user";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME}`,
  openGraph: {
    title: `${SITE_NAME}`,
  },
};

const MainPage = () => {
  return (
    <>
      <MainScreen />
      <TextWithButton
        button={{
          href: appLinks.user.buy.main,
          text: "Купить ключ",
        }}
        link={{
          text: "Узнать больше про Outline",
          href: appLinks.user.buy.main,
        }}
        isGrayBg
        rounded={{
          top: true,
        }}
      />
      <Steps />
      <Accordions isGrayBg />
      <Rates />
      <TextCards isGrayBg />
      <Accordions
        title="Вопросы и ответы"
        accordions={questionsAndAnswers}
        rounded={{
          bottom: true,
        }}
      />
    </>
  );
};

export default MainPage;
