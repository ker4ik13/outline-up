"use client";

import type { IArticle } from "@/shared/types/api";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import styles from "./MoreArticles.module.scss";

interface MoreArticlesProps {
  title?: string;
  articles: IArticle[];
}

export const MoreArticles = ({ articles, title }: MoreArticlesProps) => {
  return (
    <div className={styles.moreArticles}>
      <div className={styles.container}>
        <p className={styles.title}>{title ? title : "Читать далее"}</p>
        <div className={styles.articlesWrapper}>
          <Swiper
            wrapperClass={styles.swiperWrapper}
            slidesPerView={"auto"}
            direction="horizontal"
            spaceBetween={30}
            className={styles.articles}
            allowTouchMove={true}
            mousewheel={{
              enabled: true,
              forceToAxis: true,
            }}
            keyboard={{
              enabled: true,
            }}
            modules={[Mousewheel, Keyboard]}
          >
            {articles.map((article) => (
              <SwiperSlide className={styles.article} key={article.id}>
                <ArticleCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className={styles.articles}>
            {articles.map((article) => (
              <div className={styles.article} key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};
