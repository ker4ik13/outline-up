import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import { Download } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Скачать ${SITE_NAME}`,
  openGraph: {
    title: `Скачать ${SITE_NAME}`,
  },
  alternates: {
    canonical: `${CLIENT_URL}${appLinks.user.download.main}`,
  },
};

const UserDownloadPage = () => {
  return (
    <>
      <Download />
    </>
  );
};

export default UserDownloadPage;
