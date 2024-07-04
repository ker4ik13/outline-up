"use client";

import { getActiveStyle } from "@/shared/helpers/lib";
import type { Meta } from "@/shared/types/meta";
import { ArrowRoundedIcon } from "@/shared/ui/user/icons";
import Link from "next/link";
import { useState } from "react";
import { PagePeeker } from "../../pagination";
import { RoundModal } from "../Modals";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  meta: Meta;
  params?: {
    type?: string;
    page?: number;
    limit?: number;
  };
}

const VIEW_PAGES = 5;

// 01.07.2024
// Серверный компонент пагинации
export const Pagination = ({ meta, params }: PaginationProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { page, pageCount } = meta.pagination;
  const isPrevPageAccess = page > 1;
  const isNextPageAccess = page < pageCount;

  // Определяем начальную и конечную страницы для отображения
  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(pageCount, page + 2);

  // Корректируем диапазон страниц, если текущая страница находится в начале
  if (page <= 3) {
    endPage = Math.min(pageCount, VIEW_PAGES);
  }

  // Корректируем диапазон страниц, если текущая страница находится в конце
  if (page >= pageCount - 2) {
    startPage = Math.max(1, pageCount - 4);
  }

  // Создаем массив страниц для отображения
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const toggleModal = (value: boolean) => {
    setIsOpenModal(value);

    if (value) {
      document.body.classList.add("overflow");
      return;
    } else {
      document.body.classList.remove("overflow");
      return;
    }
  };

  return (
    <>
      <RoundModal closeModal={() => toggleModal(false)} isOpen={isOpenModal}>
        <PagePeeker
          meta={meta}
          closeModal={() => toggleModal(false)}
          params={params}
        />
      </RoundModal>
      <div className={styles.pagination}>
        {/* Предыдущая страница */}
        {isPrevPageAccess ? (
          <Link
            href={{
              query: {
                ...params,
                page: page - 1,
              },
            }}
            className={`${styles.paginationItem} ${
              styles.arrow
            } ${getActiveStyle({
              isActive: isPrevPageAccess,
              styles,
            })} ${styles.prev}`}
          >
            <ArrowRoundedIcon
              className={styles.icon}
              color={isPrevPageAccess ? "light" : "dark"}
            />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className={`${styles.paginationItem} ${styles.arrow} ${styles.prev}`}
          >
            <ArrowRoundedIcon
              className={styles.icon}
              color={isPrevPageAccess ? "light" : "dark"}
            />
          </button>
        )}

        <div className={styles.string}>
          {/* Первая страница */}
          {startPage > 1 && (
            <Link
              href={{
                query: {
                  ...params,
                  page: 1,
                },
              }}
              className={`${styles.paginationItem} ${getActiveStyle({
                isActive: 1 === page,
                styles,
              })}`}
            >
              1
            </Link>
          )}

          {/* Точки перед текущим диапазоном страниц */}
          {startPage > 2 && endPage > pageCount - 2 && (
            <button
              type="button"
              onClick={() => toggleModal(true)}
              className={styles.paginationItem}
            >
              ...
            </button>
          )}

          {/* Все страницы */}
          {pages.map((pageNum, index) => (
            <Link
              href={{
                query: {
                  ...params,
                  page: pageNum,
                },
              }}
              key={index}
              className={`${styles.paginationItem} ${getActiveStyle({
                isActive: pageNum === page,
                styles,
              })}`}
            >
              {pageNum}
            </Link>
          ))}

          {/* Точки после текущего диапазона страниц */}
          {endPage < pageCount - 1 && (
            <button
              type="button"
              onClick={() => toggleModal(true)}
              className={styles.paginationItem}
            >
              ...
            </button>
          )}

          {/* Последняя страница */}
          {endPage < pageCount && (
            <Link
              href={{
                query: {
                  ...params,
                  page: pageCount,
                },
              }}
              className={`${styles.paginationItem} ${getActiveStyle({
                isActive: pageCount === page,
                styles,
              })}`}
            >
              {pageCount}
            </Link>
          )}
        </div>

        {/* Следующая страница */}
        {isNextPageAccess ? (
          <Link
            href={{
              query: {
                ...params,
                page: page + 1,
              },
            }}
            className={`${styles.paginationItem} ${
              styles.arrow
            } ${getActiveStyle({
              isActive: isNextPageAccess,
              styles,
            })} ${styles.next}`}
          >
            <ArrowRoundedIcon className={styles.icon} color="light" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className={`${styles.paginationItem} ${styles.arrow} ${styles.next}`}
          >
            <ArrowRoundedIcon className={styles.icon} color="dark" />
          </button>
        )}
      </div>
    </>
  );
};
