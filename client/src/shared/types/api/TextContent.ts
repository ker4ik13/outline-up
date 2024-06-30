export interface TextContent {
  id: number;
  attributes: {
    title: string;
    name: string;
    content: string;
    publishDate: string;
    createdAt: string;
    updatedAt?: string;
    publishedAt?: string;
    locale?: string;
  };
}
