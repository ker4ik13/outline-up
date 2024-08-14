import { $content } from "@/http";
import type { Data, IArticle } from "@/shared/types/api";

// 01.07.2024
// Сервис для получения статей
export class ArticleService {
  // Получить статьи на главной
  static async getMainArticles(count: number = 4) {
    const response = await $content.get<Data<IArticle>>(
      `articles-api?populate=*&filters[onMainPage]=true&pagination[pageSize]=${count}&sort[0]=publishedAt:desc`
    );
    return response;
  }

  // Получить все статьи
  static async getAllArticles({
    limit = 10,
    page = 1,
    type,
  }: {
    limit?: number;
    page?: number;
    type?: string;
  }) {
    let link =
      "articles-api?populate[0]=preview.data&populate[1]=accordions.values&sort[0]=publishedAt:desc";
    if (type) {
      link += `&filters[type][$eq]=${type}`;
    }
    link += `&pagination[pageSize]=${limit}&pagination[page]=${page}`;

    const response = await $content.get<Data<IArticle>>(link);
    return response;
  }

  // Получить статью по ссылке
  static async getArticleBySlug(slug: string) {
    const response = await $content.get<Data<IArticle>>(
      `articles-api?filters[slug][$eq]=${slug}&populate[0]=preview.data&populate[1]=accordions.values&populate[2]=showPrices.data`
    );
    return response.data;
  }

  // Получить последнюю статью по типу
  static async getLastArticleByType(type: string) {
    const response = await $content.get<Data<IArticle>>(
      `articles-api?populate[0]=preview.data&populate[1]=accordions.values&sort[0]=publishedAt:desc&filters[type][$eq]=${type}`
    );
    return response.data;
  }

  // Получить больше статей
  static async getMoreArticles(slug?: string) {
    if (!slug) {
      const response = await $content.get<Data<IArticle>>(
        `articles-api?populate[0]=preview.data&populate[1]=accordions.values&sort[0]=publishedAt:desc`
      );
      return response.data;
    }

    const response = await $content.get<Data<IArticle>>(
      `articles-api?populate[0]=preview.data&populate[1]=accordions.values&sort[0]=publishedAt:desc&filters[slug][$ne]=${slug}`
    );
    return response.data;
  }
}
