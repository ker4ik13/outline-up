import { appLinks, CLIENT_URL } from "@/shared/constants";
import { MetadataRoute } from "next";

const siteRoutes = [
  {
    link: appLinks.user.main,
    lastModify: new Date(2024, 3, 4).toISOString(),
    priority: 1.0,
  },
  {
    link: appLinks.user.download.main,
    lastModify: new Date(2024, 3, 4).toISOString(),
    priority: 1.0,
  },
  {
    link: appLinks.user.instructions.main,
    lastModify: new Date(2024, 3, 4).toISOString(),
    priority: 1.0,
  },
  {
    link: appLinks.user.support.main,
    lastModify: new Date(2024, 3, 4).toISOString(),
    priority: 1.0,
  },
  {
    link: appLinks.user.offerta.main,
    lastModify: new Date(2024, 3, 4).toISOString(),
    priority: 1.0,
  },
];

export default async function sitemap() {
  // Все страницы
  const routes: MetadataRoute.Sitemap = siteRoutes.map((route) => ({
    url: `${CLIENT_URL}${route.link}`,
    lastModified: route.lastModify || new Date().toISOString(),
    priority: route.priority || 1.0,
  }));

  return [...routes];
}
