import { SITE_NAME } from "@/shared/constants";
import { ContractOffer } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Договор-оферта ${SITE_NAME}`,
  openGraph: {
    title: `Договор-оферта ${SITE_NAME}`,
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
