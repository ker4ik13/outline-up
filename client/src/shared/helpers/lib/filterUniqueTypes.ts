// 01.07.2024

import { ISortField } from "@/shared/types/api";

// Функция для удаления повторяющихся типов
export const filterUniqueTypes = (types: ISortField[]): ISortField[] | null => {
  if (!types) return null;
  if (!Array.isArray(types)) return null;

  return types.filter(
    (item, index) =>
      types.findIndex((i) => i.attributes.type === item.attributes.type) ===
      index
  );
};
