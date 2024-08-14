import { ArticleService, SortService } from "@/services/content";
import { appLinks } from "@/shared/constants";
import { generateCustomMetadata } from "@/shared/helpers/lib";
import { Articles } from "@/widgets/user/ui";
import type { Metadata } from "next/types";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
export const generateMetadata = async (): Promise<Metadata> => {
  return generateCustomMetadata(appLinks.user.articles.main, "website");
};

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: {
    type?: string;
    page?: number;
    limit?: number;
  };
}) => {
  const mainArticles = await ArticleService.getAllArticles({
    page: searchParams.page,
    type: searchParams.type,
    limit: searchParams.limit,
  });
  const sortItems = await SortService.getSortFields("articles-api");

  return (
    <>
      {mainArticles.data.data.length > 0 && (
        <Articles
          title="Статьи"
          articles={mainArticles.data}
          pagination={{
            enabled: true,
            meta: mainArticles.data.meta,
          }}
          sort={{
            enabled: true,
            items: sortItems || [],
            activeType: searchParams.type,
          }}
        />
      )}
    </>
  );
};

export default ArticlesPage;
