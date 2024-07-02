import { $content } from "@/http";
import type { Data, IArticle } from "@/shared/types/api";

// 01.07.2024
// Сервис для получения статей
export class ArticleService {
  // Получить статьи на главной
  static async getMainArticles(count: number = 4) {
    const response = await $content.get<Data<IArticle>>(
      `articles-api?populate=*&pagination[pageSize]=${count}`
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
    let link = "articles-api?populate=*";
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
      `articles-api?populate=*&slug=${slug}`
    );
    return response.data;
  }
}
