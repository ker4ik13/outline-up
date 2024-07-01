import type { StrapiImageData } from "./StrapiImage";

export interface IArticle {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string; // Текстовый контент
    preview: StrapiImageData;
    type: string; // Тип записи
    onMainPage?: boolean;
    slug: string;
    createdAt: string;
    updatedAt?: string;
    publishedAt: string;
  };
}
