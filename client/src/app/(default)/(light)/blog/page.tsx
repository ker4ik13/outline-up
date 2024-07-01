import { ArticleService, SortService } from "@/services/content";
import { Articles } from "@/widgets/user/ui";

export const revalidate = 30; // Обновление всех данных

// Генерация мета-тегов
// export const generateMetadata = async (): Promise<Metadata> => {
//   return generateCustomMetadata("/articles", "website");
// };

// export const metadata: Metadata = {
//   title: `Политика конфиденциальности: Как мы защищаем вашу приватность на сервисе ${SITE_NAME}`,
//   description:
//     "Узнайте, как мы обрабатываем и защищаем ваши личные данные на сервисе Outline Up VPN. Ваша приватность - наш приоритет.",
//   keywords:
//     "Политика конфиденциальности, защита личных данных, конфиденциальность, сервис Outline Up VPN, обработка данных, безопасность данных, защита приватности, GDPR, закон о защите данных",
//   openGraph: {
//     title: `Политика конфиденциальности: Как мы защищаем вашу приватность на сервисе ${SITE_NAME}`,
//     description:
//       "Узнайте, как мы обрабатываем и защищаем ваши личные данные на сервисе Outline Up VPN. Ваша приватность - наш приоритет.",
//     type: "website",
//     siteName: SITE_NAME,
//     url: `${CLIENT_URL}${appLinks.user.privacy.main}`,
//     images: [poster.src],
//   },
//   alternates: {
//     canonical: `${CLIENT_URL}${appLinks.user.privacy.main}`,
//     languages: {
//       ru: `${CLIENT_URL}${appLinks.user.privacy.main}`,
//     },
//   },
// };

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: { type?: string; page?: number; limit?: number };
}) => {
  const allArticles = await ArticleService.getAllArticles({
    page: searchParams.page,
    type: searchParams.type,
    limit: searchParams.limit,
  });
  const sortItems = await SortService.getSortFields("articles-api");

  return (
    <Articles
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
    />
  );
};

export default ArticlesPage;
