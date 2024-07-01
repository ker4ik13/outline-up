import { TextContentService } from "@/services/content";
import { generateCustomMetadata } from "@/shared/helpers/lib";
import { TextContent } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata("/offer", "website");
};

// export const metadata: Metadata = {
//   title: `Пользовательское соглашение: Условия использования сервиса ${SITE_NAME}`,
//   description: `Ознакомьтесь с условиями использования сервиса ${SITE_NAME} перед тем, как начать пользоваться. Надежное соединение и защита данных – наши гарантии`,
//   keywords: `Пользовательское соглашение, условия использования, соглашение об использовании, сервис ${SITE_NAME}, VPN, безопасное соединение, защита данных, конфиденциальность, интернет-безопасность`,
//   openGraph: {
//     title: `Пользовательское соглашение: Условия использования сервиса ${SITE_NAME}`,
//     description: `Ознакомьтесь с условиями использования сервиса ${SITE_NAME} перед тем, как начать пользоваться. Надежное соединение и защита данных – наши гарантии`,
//     type: "website",
//     siteName: SITE_NAME,
//     url: `${CLIENT_URL}${appLinks.user.offerta.main}`,
//     images: [poster.src],
//   },
//   alternates: {
//     canonical: `${CLIENT_URL}${appLinks.user.offerta.main}`,
//     languages: {
//       ru: `${CLIENT_URL}${appLinks.user.offerta.main}`,
//     },
//   },
// };

const ContractOfferPage = async () => {
  const response = await TextContentService.getTextContent("dogovor-oferta");
  return (
    <>
      <TextContent content={response.data[0]} />
    </>
  );
};

export default ContractOfferPage;
