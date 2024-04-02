import { SITE_NAME } from "@/shared/constants";
import { TermsOfUse } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Пользовательское соглашение ${SITE_NAME}`,
  openGraph: {
    title: `Пользовательское соглашение ${SITE_NAME}`,
  },
};

const TermsOfUsePage = () => {
  return (
    <>
      <TermsOfUse />
    </>
  );
};

export default TermsOfUsePage;
