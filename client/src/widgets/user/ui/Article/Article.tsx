import { appLinks } from "@/shared/constants";
import { setServerUrlBeforeSrc } from "@/shared/helpers/files";
import type { IArticle } from "@/shared/types/api";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import { Accordions } from "../Accordions/Accordions";
import { Rates } from "../Rates/Rates";
import styles from "./Article.module.scss";

interface ArticleProps {
  article: IArticle;
}

export const Article = ({ article }: ArticleProps) => {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <div className={styles.breadcrumbs}>
          <Link href={appLinks.user.articles.main}>Статьи</Link>
          <span>/</span>
          <Link href={appLinks.user.articles.byType(article.attributes.type)}>
            {article.attributes.type}
          </Link>
          <span>/</span>
          <span>{article.attributes.title}</span>
        </div>

        {/* Обложка */}
        <div className={styles.preview}>
          <Image
            src={setServerUrlBeforeSrc(
              article.attributes.preview.data.attributes.url
            )}
            alt={
              article.attributes.preview.data.attributes.alternativeText ||
              article.attributes.title
            }
            quality={100}
            className={styles.previewImage}
            width={1280}
            height={530}
          />
        </div>

        {/* Контент */}
        <div className={styles.content}>
          <h1 className={styles.title}>{article.attributes.title}</h1>
          <h2 className={styles.description}>
            {article.attributes.description}
          </h2>
          {/* Тут контент */}
          <Markdown>{article.attributes.content}</Markdown>
          {/* <time
            className={styles.publishDate}
            dateTime={new Date(
              article.attributes.publishedAt
            ).toLocaleDateString("ru")}
          >
            Опубликовано:{" "}
            {new Date(article.attributes.publishedAt).toLocaleDateString("ru")}
          </time> */}
        </div>
      </div>

      {article.attributes.showPrices && (
        <Rates
          data={article.attributes.showPrices.data}
          title={article.attributes.showPrices.title}
        />
      )}
      {article.attributes.accordions && article.attributes.accordions.data && (
        <Accordions
          accordions={article.attributes.accordions.data.attributes.values}
          title={article.attributes.accordions.data.attributes.title}
        />
      )}
    </article>
  );
};
