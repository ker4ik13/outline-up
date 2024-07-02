import { ArticleService } from "@/services/content";
import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация всех статей заранее
export const generateStaticParams = async () => {
  const articles = await ArticleService.getAllArticles({ limit: 100 });

  const slugs = articles.data.data.map((article) => ({
    slug: article.attributes.slug,
  }));
  return slugs;
};

// Генерация мета-тегов
export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const article = await ArticleService.getArticleBySlug(params.slug);

  if (!article || !article.data) {
    return {
      title: "404: Статья не найдена",
      description: "Страница не найдена",
    };
  }

  return {
    title: article.data[0].attributes.title,
    description: article.data[0].attributes.description,
    keywords: article.data[0].attributes.keywords,
    openGraph: {
      title: article.data[0].attributes.title,
      description: article.data[0].attributes.description,
      type: "article",
      siteName: SITE_NAME,
      url: `${CLIENT_URL}${appLinks.user.articles.bySlug(params.slug)}`,
      images: [
        article.data[0].attributes.preview.data.attributes.formats.medium.url,
      ],
    },
    alternates: {
      canonical: `${CLIENT_URL}${appLinks.user.articles.bySlug(params.slug)}`,
      languages: {
        ru: `${CLIENT_URL}${appLinks.user.articles.bySlug(params.slug)}`,
      },
    },
  };
};

const ArticlePage = async ({ params }: { params: { slug: string } }) => {
  console.log("slug:", params.slug);
  const articleBySlug = await ArticleService.getArticleBySlug(params.slug);

  return (
    <>
      {/* <Articles
        title="Статьи"
        articles={allArticles.data}
        pagination={{
          enabled: true,
          meta: allArticles.data.meta,
        }}
        sort={{
          enabled: true,
          items: sortItems || [],
          activeType: searchParams.type,
        }}
      /> */}
    </>
  );
};

export default ArticlePage;
