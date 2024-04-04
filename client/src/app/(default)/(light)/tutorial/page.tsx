import { SITE_NAME } from "@/shared/constants";
import { Instructions } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Инструкция к ${SITE_NAME}`,
  openGraph: {
    title: `Инструкция к ${SITE_NAME}`,
  },
};

const UserInstructionsPage = () => {
  return (
    <>
      <Instructions />
    </>
  );
};

export default UserInstructionsPage;
