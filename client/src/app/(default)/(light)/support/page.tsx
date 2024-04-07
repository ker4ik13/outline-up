import { questionsAndAnswers } from "@/data/user/questionsAndAnswers";
import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import { Accordion } from "@/shared/types/ui";
import { Accordions } from "@/widgets/user/ui";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Поддержка ${SITE_NAME}`,
  openGraph: {
    title: `Поддержка ${SITE_NAME}`,
  },
  alternates: {
    canonical: `${CLIENT_URL}${appLinks.user.support.main}`,
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
