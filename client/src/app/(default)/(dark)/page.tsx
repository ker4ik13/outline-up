import { possibilities } from "@/data/user/possibilities";
import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import { AccordionUserService, RatesUserService } from "@/services/content";
import { generateCustomMetadata } from "@/shared/helpers/lib";

import {
  Accordions,
  MainScreen,
  Rates,
  Steps,
  TextCards,
  TextWithButton,
} from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata("/", "website");
};

const UserMainPage = async () => {
  const rates = await RatesUserService.getRates();
  const asksAndAnswersAccordions =
    await AccordionUserService.getAsksAndAnswers();
  const advantagesAccordions = await AccordionUserService.getAdvantages();
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
      {advantagesAccordions.data &&
      advantagesAccordions.data[0].attributes.values ? (
        <Accordions
          accordions={advantagesAccordions.data[0].attributes.values}
          title={advantagesAccordions.data[0].attributes.title}
          key={advantagesAccordions.data[0].attributes.name}
          moreText={advantagesAccordions.data[0].attributes.moreText}
          isGrayBg
        />
      ) : (
        <Accordions
          accordions={possibilities}
          title="Используя Outline UP вы получаете"
          isGrayBg
        />
      )}
      <Rates
        data={rates && rates.data && rates.data.length > 0 ? rates.data : []}
      />
      <TextCards isGrayBg />
      {asksAndAnswersAccordions.data &&
      asksAndAnswersAccordions.data[0].attributes.values ? (
        <Accordions
          accordions={asksAndAnswersAccordions.data[0].attributes.values}
          title={asksAndAnswersAccordions.data[0].attributes.title}
          key={asksAndAnswersAccordions.data[0].attributes.name}
          moreText={asksAndAnswersAccordions.data[0].attributes.moreText}
          isGrayBg
        />
      ) : (
        <Accordions title="Вопросы и ответы" accordions={questionsAndAnswers} />
      )}
    </>
  );
};

export default UserMainPage;
