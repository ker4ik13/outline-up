import { generateCustomMetadata } from "@/shared/helpers/lib";
import { PrivacyPolicy } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata("/privacy", "website");
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

const PrivacyPolicyPage = () => {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
