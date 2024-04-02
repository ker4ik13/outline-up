import { possibilities } from "@/data/user/possibilities";
import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import { SITE_NAME } from "@/shared/constants";
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
  title: `${SITE_NAME}`,
  openGraph: {
    title: `${SITE_NAME}`,
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

export default UserMainPage;
