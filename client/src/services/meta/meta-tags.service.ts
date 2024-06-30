import { $content } from "@/http";
import type { Data } from "@/shared/types/api";
import type { MetaTags } from "@/shared/types/meta";

// 30.06.2024
// Сервис для получения мета-тегов
export class MetaTagsService {
  // Получить мета-теги по странице
  static async getMetaTagsByPath(path: string) {
    const response = await $content.get<Data<MetaTags>>(
      `/meta-tags-api?populate=*&path=${path}`
    );
    return response;
  }
}
