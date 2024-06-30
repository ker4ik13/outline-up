import { generateCustomMetadata } from "@/shared/helpers/lib";
import { Instructions } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata("/tutorial", "website");
};

// export const metadata: Metadata = {
//   title: `Инструкция: Как пользоваться ${SITE_NAME} для безопасного доступа в интернет`,
//   description: `Узнайте, как легко начать пользоваться ${SITE_NAME} для безопасного и свободного доступа в интернет.`,
//   keywords:
//     "Инструкция, пользоваться, Outline Up, VPN, безопасный доступ в интернет, руководство, шаг за шагом, использование VPN, настройка VPN",
//   openGraph: {
//     title: `Инструкция: Как пользоваться ${SITE_NAME} для безопасного доступа в интернет`,
//     description: `Узнайте, как легко начать пользоваться ${SITE_NAME} для безопасного и свободного доступа в интернет.`,
//     type: "website",
//     siteName: SITE_NAME,
//     url: `${CLIENT_URL}${appLinks.user.instructions.main}`,
//     images: [poster.src],
//   },
//   alternates: {
//     canonical: `${CLIENT_URL}${appLinks.user.instructions.main}`,
//     languages: {
//       ru: `${CLIENT_URL}${appLinks.user.instructions.main}`,
//     },
//   },
// };

const UserInstructionsPage = () => {
  return (
    <>
      <Instructions />
    </>
  );
};

export default UserInstructionsPage;
