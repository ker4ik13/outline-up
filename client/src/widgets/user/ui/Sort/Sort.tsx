import { ISortField } from "@/shared/types/api";
import Link from "next/link";
import styles from "./Sort.module.scss";

interface SortProps {
  sortItems: ISortField[];
  activeType?: string;
  parentPageLink: string;
}

// 01.07.2024
// Серверный компонент сортировки принимает возможные значения [type]
// и количество элементов на странице
// Перенаправляет на эндпоинт с этими значениями
export const Sort = async ({
  sortItems,
  activeType,
  parentPageLink,
}: SortProps) => {
  return (
    <div className={styles.sort}>
      <div className={styles.sortWrapper}>
        <Link
          href={parentPageLink}
          className={`${styles.sortItem} ${!activeType ? styles.active : ""}`}
        >
          Все
        </Link>
        {sortItems.map((field) => (
          <Link
            href={{
              query: {
                type: field.attributes.type,
              },
            }}
            className={`${styles.sortItem} ${
              activeType === field.attributes.type ? styles.active : ""
            }`}
            key={field.id}
          >
            {field.attributes.type}
          </Link>
        ))}
      </div>
    </div>
  );
};
