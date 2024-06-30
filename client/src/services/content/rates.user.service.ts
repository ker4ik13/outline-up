import { $content } from "@/http";
import type { Data } from "@/shared/types/api";
import type { Rate } from "@/shared/types/ui";

// 30.06.2024
// Сервис для получения тарифов
export class RatesUserService {
  static async getRates() {
    const response = await $content.get<Data<Rate>>("/rates-api?populate=*");
    return response.data;
  }
}
