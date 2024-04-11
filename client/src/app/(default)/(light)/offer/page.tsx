import poster from "@/data/user/source/Header.jpg";
import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import { ContractOffer } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Пользовательское соглашение: Условия использования сервиса ${SITE_NAME}`,
  description: `Ознакомьтесь с условиями использования сервиса ${SITE_NAME} перед тем, как начать пользоваться. Надежное соединение и защита данных – наши гарантии`,
  keywords: `Пользовательское соглашение, условия использования, соглашение об использовании, сервис ${SITE_NAME}, VPN, безопасное соединение, защита данных, конфиденциальность, интернет-безопасность`,
  openGraph: {
    title: `Пользовательское соглашение: Условия использования сервиса ${SITE_NAME}`,
    description: `Ознакомьтесь с условиями использования сервиса ${SITE_NAME} перед тем, как начать пользоваться. Надежное соединение и защита данных – наши гарантии`,
    type: "website",
    siteName: SITE_NAME,
    url: `${CLIENT_URL}${appLinks.user.offerta.main}`,
    images: [poster.src],
  },
  alternates: {
    canonical: `${CLIENT_URL}${appLinks.user.offerta.main}`,
    languages: {
      ru: `${CLIENT_URL}${appLinks.user.offerta.main}`,
    },
  },
};

const ContractOfferPage = () => {
  return (
    <>
      <ContractOffer />
    </>
  );
};

export default ContractOfferPage;
