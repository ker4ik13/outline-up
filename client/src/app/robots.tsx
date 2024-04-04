import { appLinks, CLIENT_URL } from "@/shared/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          `${appLinks.user.main}`,
          `${appLinks.user.download.main}/`,
          `${appLinks.user.instructions.main}/`,
          `${appLinks.user.offerta.main}/`,
          `${appLinks.user.support.main}/`,
          `${appLinks.user.privacy.main}/`,
        ],
        disallow: [
          `${appLinks.user.main}*?*`,
          `${appLinks.user.download.main}/*?*`,
          `${appLinks.user.instructions.main}/*?*`,
          `${appLinks.user.offerta.main}/*?*`,
          `${appLinks.user.support.main}/*?*`,
          `${appLinks.user.privacy.main}/*?*`,
          `${appLinks.admin.main}*?*`,
        ],
      },
    ],
    sitemap: `${CLIENT_URL}/sitemap.xml`,
  };
}
