import { CLIENT_URL } from "@/shared/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/download"],
        disallow: ["/*?*", "/download/*?*"],
      },
    ],
    sitemap: `${CLIENT_URL}/sitemap.xml`,
  };
}
