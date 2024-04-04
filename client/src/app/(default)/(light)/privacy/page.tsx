import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import { PrivacyPolicy } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Политика конфиденциальности ${SITE_NAME}`,
  openGraph: {
    title: `Политика конфиденциальности ${SITE_NAME}`,
  },
  alternates: {
    canonical: `${CLIENT_URL}${appLinks.user.privacy.main}`,
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
