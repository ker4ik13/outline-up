import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import { SITE_NAME } from "@/shared/constants";
import { Accordion } from "@/shared/types/ui";
import { Accordions } from "@/widgets/user/ui";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Поддержка ${SITE_NAME}`,
  openGraph: {
    title: `Поддержка ${SITE_NAME}`,
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
            <Link href={"https://t.me/supportoutlineup"} target="_blank">
              supportoutlineup
            </Link>{" "}
            или на почту{" "}
            <Link href="mailto:support@outlineup.ru" target="_blank">
              support@outlineup.ru
            </Link>
          </p>
        }
      />
    </>
  );
};

export default UserSupportPage;
