import type { ArticleMeta } from "./ArticleMeta";

export interface CreateArticleDto {
  slug: string;
  title: string;
  description: string;
  content: string;
  preview: string;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  status: "published" | "draft";
  viewCount?: number;
  tags?: string;
  meta: ArticleMeta;
}
