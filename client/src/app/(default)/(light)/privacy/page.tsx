import { SITE_NAME } from "@/shared/constants";
import { PrivacyPolicy } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Политика конфиденциальности ${SITE_NAME}`,
  openGraph: {
    title: `Политика конфиденциальности ${SITE_NAME}`,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
