import { ArticleService, SortService } from "@/services/content";
import { appLinks, CLIENT_URL } from "@/shared/constants";
import type { MetadataRoute } from "next";

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
  {
    link: appLinks.user.privacy.main,
    lastModify: new Date(2024, 3, 4).toISOString(),
    priority: 1.0,
  },
  {
    link: appLinks.user.articles.main,
    lastModify: new Date(2024, 6, 3).toISOString(),
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

  // Все статьи
  const articles = await ArticleService.getAllArticles({
    limit: 100,
  });
  const articlesRoutes: MetadataRoute.Sitemap = [];

  if (articles.data) {
    articles.data.data.forEach((article) => {
      const url = `${CLIENT_URL}${appLinks.user.articles.bySlug(
        article.attributes.slug
      )}`;
      articlesRoutes.push({ url, lastModified: article.attributes.updatedAt });
    });
  }

  // Все категории
  const categories = await SortService.getSortFields("articles-api");
  const typesRoutes: MetadataRoute.Sitemap = [];

  // const lastArticlesByTypes: IArticle[] = [];

  if (categories && categories.length) {
    // Получаем последние статьи по каждому типу

    // categories.forEach(async (type) => {
    //   const lastArticleByType = await ArticleService.getLastArticleByType(
    //     type.attributes.type
    //   );

    //   if (!lastArticleByType || lastArticleByType.data.length === 0) {
    //     return;
    //   }

    //   lastArticlesByTypes.push(lastArticleByType.data[0]);
    // });

    categories.forEach((type) => {
      // const articleByCurrentType = lastArticlesByTypes.find(
      //   (article) => article.attributes.type === type.attributes.type
      // );

      const url = `${CLIENT_URL}${appLinks.user.articles.byType(
        type.attributes.type
      )}`;
      typesRoutes.push({
        url,
        priority: 1,
        // lastModified: articleByCurrentType?.attributes.updatedAt,
      });
    });
  }

  return [...routes, ...typesRoutes, ...articlesRoutes];
}
