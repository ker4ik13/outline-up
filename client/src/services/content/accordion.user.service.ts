import { $content } from "@/http";
import { Data, type IAccordions } from "@/shared/types/api";
import { InstructionAccordion, type Accordion } from "@/shared/types/ui";

// 30.06.2024
// Сервис для получения аккордеонов
export class AccordionUserService {
  // Получить вопросы и ответы
  static async getAsksAndAnswers() {
    const response = await $content.get<IAccordions<Accordion>>(
      "/accordions-api?populate=*&filters[name][$eq]=asks-and-answers"
    );
    return response.data;
  }

  // Получить преимущества
  static async getAdvantages() {
    const response = await $content.get<IAccordions<Accordion>>(
      "/accordions-api?populate=*&filters[name][$eq]=advantages"
    );
    return response.data;
  }

  // Получить поддержку
  static async getSupport() {
    const response = await $content.get<IAccordions<Accordion>>(
      "/accordions-api?populate=*&filters[name][$eq]=support-outline-up"
    );
    return response.data;
  }

  static async getInstructions() {
    const response = await $content.get<Data<InstructionAccordion>>(
      "/accordions-tutorial?populate=*"
    );
    return response.data;
  }
}
