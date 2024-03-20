import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import { appLinks } from "@/shared/constants";
import {
  Accordions,
  Footer,
  MainScreen,
  Rates,
  Steps,
  TextCards,
  TextWithButton,
} from "@/widgets/user";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Outline UP",
};

const page = () => {
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
      <Footer />
    </>
  );
};

export default page;
