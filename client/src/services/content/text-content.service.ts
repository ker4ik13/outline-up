import { $content } from "@/http";
import type { Data, TextContent } from "@/shared/types/api";

// 30.06.2024
// Сервис для получения текстового контента
export class TextContentService {
  static async getTextContent(name: string) {
    const response = await $content.get<Data<TextContent>>(
      `/text-content-api?populate=*&filters[name][$eq]=${name}`
    );
    return response.data;
  }
}
