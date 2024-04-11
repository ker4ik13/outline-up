import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import poster from "@/data/user/source/Header.jpg";
import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import { Accordion } from "@/shared/types/ui";
import { Accordions } from "@/widgets/user/ui";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Поддержка: Ответы на вопросы по использованию ${SITE_NAME}`,
  description: `Здесь вы найдете ответы на самые часто задаваемые вопросы о использовании ${SITE_NAME}. Получите помощь здесь.`,
  keywords:
    "Поддержка, вопросы и ответы, Outline Up, VPN, помощь, поддержка пользователей, техническая поддержка, часто задаваемые вопросы, FAQ",
  openGraph: {
    title: `Поддержка: Ответы на вопросы по использованию ${SITE_NAME}`,
    description: `Здесь вы найдете ответы на самые часто задаваемые вопросы о использовании ${SITE_NAME}. Получите помощь здесь.`,
    type: "website",
    siteName: SITE_NAME,
    url: `${CLIENT_URL}${appLinks.user.support.main}`,
    images: [poster.src],
  },
  alternates: {
    canonical: `${CLIENT_URL}${appLinks.user.support.main}`,
    languages: {
      ru: `${CLIENT_URL}${appLinks.user.support.main}`,
    },
  },
};

const supportItems: Accordion[] = [];

const UserSupportPage = () => {
  return (
    <>
      <Accordions
        title={`Поддержка ${SITE_NAME}`}
        lowerPadding
        mainTitle
        accordions={
          supportItems && supportItems.length
            ? supportItems
            : questionsAndAnswers
        }
        moreText={
          <p>
            Если вы не нашли ответа на свой вопрос на этой странице, то напишите
            нам в телеграм:{" "}
            <Link href={appLinks.other.tgSupport} target="_blank">
              outlineupsupport
            </Link>{" "}
            или на почту{" "}
            <Link
              href={`mailto:${appLinks.other.emailSupport}`}
              target="_blank"
            >
              {appLinks.other.emailSupport}
            </Link>
          </p>
        }
      />
    </>
  );
};

export default UserSupportPage;
