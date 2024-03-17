import { type Types } from 'mongoose';
import type { ArticleMeta } from './ArticleMeta';

export interface Article {
  _id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  preview: string;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  author: Types.ObjectId;
  status: 'published' | 'draft';
  viewCount?: number;
  tags?: string;
  meta: ArticleMeta;
}

export interface ArticleWithoudId extends Omit<Article, '_id'> {}
