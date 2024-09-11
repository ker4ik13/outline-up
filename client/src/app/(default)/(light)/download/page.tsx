import { appLinks } from "@/shared/constants";
import { generateCustomMetadata } from "@/shared/helpers/lib";
import { Download } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata(appLinks.user.download.main, "website");
};

const UserDownloadPage = () => {
  return (
    <>
      <Download />
    </>
  );
};

export default UserDownloadPage;
