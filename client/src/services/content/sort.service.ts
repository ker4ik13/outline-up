import { $content } from "@/http";
import { filterUniqueTypes } from "@/shared/helpers/lib";
import type { Data, ISortField } from "@/shared/types/api";

// 01.07.2024
// Сервис для сортировки

export class SortService {
  // Получить все возможные поля сортировки
  static async getSortFields(apiEndpoint: string) {
    const response = await $content.get<Data<ISortField>>(
      `/${apiEndpoint}?fields=type&pagination[pageSize]=100`
    );
    const uniqueTypes = filterUniqueTypes(response.data.data);

    return uniqueTypes;
  }
}
