import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { ArticleMeta, ArticleWithoudId } from 'src/types/article';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({
  collection: 'articles',
})
export class Article implements ArticleWithoudId {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
    ref: 'User',
  })
  author: Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    required: true,
  })
  preview: string;

  @Prop({
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Prop()
  updatedAt?: string;

  @Prop()
  publishedAt?: string;

  @Prop({
    required: true,
  })
  status: 'published' | 'draft';

  @Prop({
    default: 0,
  })
  viewCount?: number;

  @Prop()
  tags?: string;

  @Prop({
    type: {
      title: {
        type: String,
        required: true,
      },
      description: String,
      keywords: String,
    },
    required: true,
  })
  meta: ArticleMeta;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
