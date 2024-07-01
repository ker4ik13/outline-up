import { appLinks, SERVER_URL } from "@/shared/constants";
import { IArticle } from "@/shared/types/api";
import { ArrowIcon } from "@/shared/ui/user/icons";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleCard.module.scss";

interface ArticleCardProps {
  article: IArticle;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link
      href={appLinks.user.articles.bySlug(article.attributes.slug)}
      className={styles.articleCard}
    >
      <div className={styles.preview}>
        <Image
          src={`${SERVER_URL}${article.attributes.preview.data.attributes.formats.large.url}`}
          alt={
            article.attributes.preview.data.attributes.alternativeText ||
            "Article preview"
          }
          width={625}
          height={260}
          className={styles.previewImage}
        />
      </div>
      <div className={styles.articleContent}>
        <h4 className={styles.articleTitle}>{article.attributes.title}</h4>
        <p className={styles.articleDesc}>{article.attributes.description}</p>
        <ArrowIcon className={styles.icon} />
      </div>
    </Link>
  );
};
