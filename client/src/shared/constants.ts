export const THEME_KEY = "joy-mode";
export const SITE_NAME = "Outline UP";
export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
export const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;
export const SERVER_FILES_DIST = "uploads";
export const YANDEX_METRIKA = 97025859;
export const GOOGLE_ANALYTICS = "GTM-P3LH9BQD";
export const MAIN_ARTICLES_COUNT = 4; // Сколько выводить статей на главной странице

export const appLinks = {
  user: {
    main: "/",
    download: {
      main: "/download",
    },
    buy: {
      main: "/#buy-key",
    },
    instructions: {
      main: "/tutorial",
    },
    offerta: {
      main: "/offer",
    },
    support: {
      main: "/support",
    },
    termsOfUse: {
      main: "/terms-of-use",
    },
    privacy: {
      main: "/privacy",
    },
    articles: {
      main: "/blog",
      bySlug: (slug: string) => `/blog/${slug}`,
    },
  },
  admin: {
    main: "/admin/",
    dashboard: "/admin/dashboard",
    articles: {
      main: "/admin/articles",
      new: "/admin/articles/new",
      edit: (link: string) => `/admin/articles/edit/${link}`,
      view: (link: string) => `/admin/articles/view/${link}`,
    },
    orders: "/admin/orders",
    mailings: "/admin/mailings",
    help: "/admin/help",
    profile: {
      me: "/admin/profile",
      edit: "/admin/profile/edit",
      changePass: "/admin/profile/edit/password",
    },
    settings: "/admin/settings",
    users: {
      main: "/admin/users",
      view: (link: string) => `/admin/users/${link}`,
    },
    wallet: "/admin/wallet",
    responses: "/admin/responses",
    documentation: {
      main: "/admin/documentation",
      articles: "/admin/documentation/articles",
      profile: "/admin/documentation/profile",
      users: "/admin/documentation/users",
      mailings: "/admin/documentation/mailings",
      orders: "/admin/documentation/orders",
    },
    tools: {
      main: "/admin/tools",
      qr: "/admin/tools/qr",
    },
    auth: {
      login: "/admin/auth/signin",
      registration: "/admin/auth/signup",
    },
  },
  other: {
    tgBot: "https://t.me/OutlineUpBot",
    tgSupport: "https://t.me/outlineupsupport",
    emailSupport: "support@outlineup.ru",
  },
};
