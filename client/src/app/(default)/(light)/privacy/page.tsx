import { TextContentService } from "@/services/content";
import { appLinks } from "@/shared/constants";
import { generateCustomMetadata } from "@/shared/helpers/lib";
import { TextContent } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata(appLinks.user.privacy.main, "website");
};

// export const metadata: Metadata = {
//   title: `Политика конфиденциальности: Как мы защищаем вашу приватность на сервисе ${SITE_NAME}`,
//   description:
//     "Узнайте, как мы обрабатываем и защищаем ваши личные данные на сервисе Outline Up VPN. Ваша приватность - наш приоритет.",
//   keywords:
//     "Политика конфиденциальности, защита личных данных, конфиденциальность, сервис Outline Up VPN, обработка данных, безопасность данных, защита приватности, GDPR, закон о защите данных",
//   openGraph: {
//     title: `Политика конфиденциальности: Как мы защищаем вашу приватность на сервисе ${SITE_NAME}`,
//     description:
//       "Узнайте, как мы обрабатываем и защищаем ваши личные данные на сервисе Outline Up VPN. Ваша приватность - наш приоритет.",
//     type: "website",
//     siteName: SITE_NAME,
//     url: `${CLIENT_URL}${appLinks.user.privacy.main}`,
//     images: [poster.src],
//   },
//   alternates: {
//     canonical: `${CLIENT_URL}${appLinks.user.privacy.main}`,
//     languages: {
//       ru: `${CLIENT_URL}${appLinks.user.privacy.main}`,
//     },
//   },
// };

const PrivacyPolicyPage = async () => {
  const response = await TextContentService.getTextContent("privacy-policy");
  return (
    <>
      <TextContent content={response.data[0]} />
    </>
  );
};

export default PrivacyPolicyPage;
