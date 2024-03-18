import { appLinks } from "@/shared/constants";
import { MainScreen, TextWithButton } from "@/widgets/user";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Outline UP",
};

const page = () => {
  return (
    <>
      <MainScreen />
      <TextWithButton
        button={{
          href: appLinks.user.buy.main,
          text: "Купить ключ",
        }}
        link={{
          text: "Узнать больше про Outline",
          href: appLinks.user.buy.main,
        }}
      />
    </>
  );
};

export default page;
