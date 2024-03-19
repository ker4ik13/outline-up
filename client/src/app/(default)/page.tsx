import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import { appLinks } from "@/shared/constants";
import {
  Accordions,
  MainScreen,
  Rates,
  Steps,
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
      />
      <Steps />
      <Accordions />
      <Rates />
      <Accordions title="Вопросы и ответы" accordions={questionsAndAnswers} />
    </>
  );
};

export default page;
