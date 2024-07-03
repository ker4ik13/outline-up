import { appLinks } from "@/shared/constants";
import { setServerUrlBeforeSrc } from "@/shared/helpers/files";
import type { IArticle } from "@/shared/types/api";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import styles from "./Article.module.scss";

interface ArticleProps {
  article: IArticle;
}

export const Article = ({ article }: ArticleProps) => {
  return (
    <div className={styles.article}>
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
              article.attributes.preview.data.attributes.formats.large.url
            )}
            alt={
              article.attributes.preview.data.attributes.alternativeText ||
              article.attributes.title
            }
            className={styles.previewImage}
            width={1280}
            height={530}
          />
        </div>

        {/* Контент */}
        <article className={styles.content}>
          <h1 className={styles.title}>{article.attributes.title}</h1>
          <h2 className={styles.description}>
            {article.attributes.description}
          </h2>
          {/* Основной контент статьи */}
          <Markdown>{article.attributes.content}</Markdown>
          <time
            className={styles.publishDate}
            dateTime={new Date(
              article.attributes.publishedAt
            ).toLocaleDateString("ru")}
          >
            Опубликовано:{" "}
            {new Date(article.attributes.publishedAt).toLocaleDateString("ru")}
          </time>
        </article>
      </div>
    </div>
  );
};
