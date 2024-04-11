import poster from "@/data/user/source/Header.jpg";
import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import { Download } from "@/widgets/user/ui";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: `Скачать ${SITE_NAME}: Надежный VPN для безграничного доступа в Интернет`,
  description: `Получите мгновенный доступ к безопасному и надежному VPN-серверу ${SITE_NAME}. Скачайте приложение прямо сейчас и наслаждайтесь свободой в Интернете!`,
  keywords:
    "Скачать, VPN, Outline Up, безопасный доступ в интернет, мгновенное подключение, свободный доступ в сеть, анонимное подключение, скачать VPN, скачать Outline Up, VPN-сервер, безопасное соединение, защита данных, приватность онлайн, интернет-безопасность",
  openGraph: {
    title: `Скачать ${SITE_NAME}: Надежный VPN для безграничного доступа в Интернет`,
    description: `Получите мгновенный доступ к безопасному и надежному VPN-серверу ${SITE_NAME}. Скачайте приложение прямо сейчас и наслаждайтесь свободой в Интернете!`,
    type: "website",
    siteName: SITE_NAME,
    url: `${CLIENT_URL}${appLinks.user.download.main}`,
    images: [poster.src],
  },
  alternates: {
    canonical: `${CLIENT_URL}${appLinks.user.download.main}`,
    languages: {
      ru: `${CLIENT_URL}${appLinks.user.download.main}`,
    },
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
