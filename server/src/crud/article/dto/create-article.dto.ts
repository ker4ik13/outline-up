import { IsNotEmpty, IsString } from 'class-validator';
import { type Types } from 'mongoose';

const errorTexts = {
  slug: 'Ссылка не может быть пустой',
  title: 'Заголовок не может быть пустым',
  description: 'Описание не может быть пустым',
  content: 'Контент не может быть пустым',
  preview: 'Предварительный просмотр не может быть пустым',
  author: 'Автор не может быть пустым',
};

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty({
    message: errorTexts.slug,
  })
  slug: string;

  @IsString()
  @IsNotEmpty({
    message: errorTexts.title,
  })
  title: string;

  @IsString()
  @IsNotEmpty({
    message: errorTexts.description,
  })
  description: string;

  @IsString()
  @IsNotEmpty({
    message: errorTexts.content,
  })
  content: string;

  @IsNotEmpty({
    message: errorTexts.preview,
  })
  preview: string;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;

  @IsString()
  @IsNotEmpty({
    message: errorTexts.author,
  })
  author: Types.ObjectId;
  status: 'published' | 'draft';
  viewCount?: number;
  tags?: string;
  meta: string;

  constructor(data: Partial<CreateArticleDto>) {
    Object.assign(this, data);
  }
}
