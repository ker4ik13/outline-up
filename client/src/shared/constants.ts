export const THEME_KEY = "joy-mode";
export const SITE_NAME = "Kireev Dev";
export const SERVER_FILES_DIST = "uploads";

export const appLinks = {
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
};
