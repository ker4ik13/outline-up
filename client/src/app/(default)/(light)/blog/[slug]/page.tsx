import { ArticleService } from "@/services/content";
import { appLinks, CLIENT_URL, SITE_NAME } from "@/shared/constants";
import { Article, MoreArticles } from "@/widgets/user/ui";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация всех статей заранее
export const generateStaticParams = async () => {
  const articles = await ArticleService.getAllArticles({ limit: 100 });

  if (!articles.data.data || articles.data.data.length === 0) {
    return [];
  }

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

  if (!article.data.length || !article.data[0]) {
    return notFound();
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
  const articleBySlug = await ArticleService.getArticleBySlug(params.slug);
  const moreArticles = await ArticleService.getMoreArticles(params.slug);

  if (!articleBySlug.data.length || !articleBySlug.data[0]) {
    return notFound();
  }

  return (
    <>
      <Article article={articleBySlug.data[0]} />
      {moreArticles.data.length > 0 && (
        <MoreArticles articles={moreArticles.data} />
      )}
    </>
  );
};

export default ArticlePage;
