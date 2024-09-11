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

const PrivacyPolicyPage = async () => {
  const response = await TextContentService.getTextContent("privacy-policy");
  return (
    <>
      <TextContent content={response.data[0]} />
    </>
  );
};

export default PrivacyPolicyPage;
