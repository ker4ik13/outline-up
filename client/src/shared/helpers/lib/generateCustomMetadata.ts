import { MetaTagsService } from "@/services/meta";
import { CLIENT_URL, SITE_NAME } from "@/shared/constants";
import type { SiteType } from "@/shared/types/meta";
import type { Metadata } from "next/types";

// 30.06.2024
// Функция для получения и генерации мета-тегов
export const generateCustomMetadata = async (
  path: string,
  type?: SiteType
): Promise<Metadata> => {
  const response = await MetaTagsService.getMetaTagsByPath(path);

  // Если нет мета-тегов, то возвращаем стандартные мета-теги
  if (!response.data.data) {
    return {
      metadataBase: new URL(`${CLIENT_URL}${path}`),
      title: SITE_NAME,
      openGraph: {
        siteName: SITE_NAME,
        url: `${CLIENT_URL}${path}`,
        type: type || "website",
      },
      alternates: {
        canonical: `${CLIENT_URL}${path}`,
      },
    };
  }

  return {
    metadataBase: new URL(
      `${CLIENT_URL}${response.data.data[0].attributes.path || path}`
    ),
    title: response.data.data[0].attributes.title,
    description: response.data.data[0].attributes.description,
    keywords: response.data.data[0].attributes.keywords,
    openGraph: {
      type: response.data.data[0].attributes.type || type || "website",
      title: response.data.data[0].attributes.title,
      description: response.data.data[0].attributes.description,
      siteName: SITE_NAME,
      url: `${CLIENT_URL}${response.data.data[0].attributes.path || path}`,
      images: [
        `${CLIENT_URL}${response.data.data[0].attributes.image?.data.attributes.url}`,
      ],
    },
    alternates: {
      canonical: `${CLIENT_URL}${
        response.data.data[0].attributes.path || path
      }`,
    },
  };
};
