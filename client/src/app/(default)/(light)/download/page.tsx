import { SITE_NAME } from "@/shared/constants";
import { Download } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Скачать ${SITE_NAME}`,
  openGraph: {
    title: `Скачать ${SITE_NAME}`,
  },
};

const page = () => {
  return (
    <>
      {/* <MainScreen /> */}
      <Download
        rounded={{
          top: true,
          bottom: true,
        }}
      />
    </>
  );
};

export default page;
