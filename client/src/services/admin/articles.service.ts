import $api from "@/http";
import { PageDto, type PageOptionsDto } from "@/shared/dtos/page";
import { setServerUrlBeforeSrc } from "@/shared/helpers/files";
import { IsValid } from "@/shared/types";
import type { Article, ChangeArticleDto } from "@/shared/types/article";
import { AxiosError } from "axios";

export class ArticlesService {
  static async addArticle(article: FormData) {
    return await $api.post<Article>("/articles", article, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async getArticles(
    options?: PageOptionsDto
  ): Promise<PageDto<Article>> {
    try {
      const response = await $api.get<PageDto<Article>>("/articles", {
        params: options,
      });

      if (!response.data.data) {
        return new PageDto([], response.data.meta);
      }

      const articles = [...response.data.data].map((article) => {
        return {
          ...article,
          preview: setServerUrlBeforeSrc(article.preview),
        };
      });

      return new PageDto(articles, response.data.meta);
    } catch (error) {
      throw new AxiosError("Произошла ошибка при получении статей");
    }
  }

  static async getOneArticle(slug: string): Promise<Article> {
    try {
      const response = await $api.get<Article>(`/articles/${slug}`);

      return {
        ...response.data,
        preview: setServerUrlBeforeSrc(response.data.preview),
      };
    } catch (error) {
      throw new AxiosError("Произошла ошибка при получении статьи");
    }
  }

  static async changeArticle(slug: string, dto: ChangeArticleDto) {
    return await $api.patch<Article>(`/articles/${slug}`, dto);
  }

  static async checkSlug(slug: string) {
    return await $api.get<IsValid>(`/check/${slug}`);
  }

  static async deleteArticle(slug: string) {
    return await $api.delete<Article>(`/articles/${slug}`);
  }
}
