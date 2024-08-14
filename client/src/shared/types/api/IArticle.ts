import type { Accordion, Rate } from "../ui";
import type { IAccordionsOne } from "./IAccordions";
import type { StrapiImageData } from "./StrapiImage";

export interface IArticle {
  id: number;
  attributes: {
    title: string;
    description: string;
    keywords?: string;
    content: string; // Текстовый контент
    preview: StrapiImageData;
    type: string; // Тип записи
    onMainPage?: boolean;
    slug: string;
    createdAt: string;
    updatedAt?: string;
    publishedAt: string;
    accordions?: IAccordionsOne<Accordion>;
    showPrices?: {
      id: number;
      title?: string;
      data: Rate[];
    };
  };
}
