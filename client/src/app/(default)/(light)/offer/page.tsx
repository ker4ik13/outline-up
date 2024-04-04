import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import { ContractOffer } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Договор-оферта ${SITE_NAME}`,
  openGraph: {
    title: `Договор-оферта ${SITE_NAME}`,
  },
  alternates: {
    canonical: `${CLIENT_URL}${appLinks.user.offerta.main}`,
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
