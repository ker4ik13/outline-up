export class ArticleMetaDto {
  title: string;
  description?: string;
  keywords?: string;

  constructor(data: Partial<ArticleMetaDto>) {
    Object.assign(this, data);
  }
}
