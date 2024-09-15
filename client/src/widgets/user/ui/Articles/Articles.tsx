import { appLinks } from "@/shared/constants";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type { Data, IArticle, ISortField } from "@/shared/types/api";
import type { Meta } from "@/shared/types/meta";
import type { DefaultBlockProps } from "@/shared/types/ui";
import Link from "next/link";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import { Pagination } from "../Pagination/Pagination";
import { Sort } from "../Sort/Sort";
import styles from "./Articles.module.scss";

interface Props extends DefaultBlockProps {
  articles: Data<IArticle>;
  title?: string;
  sort?: {
    enabled: boolean;
    items: ISortField[];
    activeType?: string;
  };
  pagination?: {
    enabled: boolean;
    meta: Meta;
  };
  mainArticles?: boolean;
}

export const Articles = async ({
  title,
  className,
  isGrayBg,
  rounded,
  pagination,
  sort,
  articles,
  mainArticles,
  withoutTopPadding,
}: Props) => {
  return (
    <div
      className={`${styles.articles} ${
        !mainArticles ? styles.paddingTop : ""
      } ${getDefaultBlockStyles({
        styles,
        isGrayBg,
        rounded,
        className,
        withoutTopPadding,
      })}`}
    >
      <div className={styles.container}>
        <h2 className={`${styles.title} ${styles.miniMargin}`}>
          {title ? title : "Статьи"}
        </h2>
        {sort && sort.enabled && sort.items.length > 0 && (
          <Sort
            sortItems={sort.items}
            activeType={sort.activeType}
            parentPageLink={appLinks.user.articles.main}
          />
        )}
        <div className={styles.articlesCards}>
          {articles &&
            articles.data &&
            articles.data.length &&
            articles.data.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
        </div>
        {pagination && pagination.enabled && (
          <Pagination
            meta={articles.meta}
            params={{
              type: sort?.activeType,
              limit: pagination.meta.pagination.pageSize,
            }}
          />
        )}
        {mainArticles && (
          <Link className={styles.link} href={appLinks.user.articles.main}>
            Смотреть все статьи
          </Link>
        )}
      </div>
    </div>
  );
};
