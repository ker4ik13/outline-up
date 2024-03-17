"use client";

import s from "@/pages/GeneralPage.module.scss";
import { appLinks } from "@/shared/constants";
import { useAuth } from "@/shared/helpers/auth";
import { CustomBreadcrumbs } from "@/shared/ui";
import { NewArticle } from "@/widgets/NewArticle/NewArticle";
import { useEffect } from "react";

const NewArticlePage = () => {
  const { isAuth, user, getUser } = useAuth();

  useEffect(() => {
    if (!isAuth || !user) {
      getUser();
    }
  }, []);

  return (
    <div className={s.page}>
      <CustomBreadcrumbs
        pages={[
          { label: "Статьи", link: appLinks.admin.articles.main },
          { label: "Новая статья", link: appLinks.admin.articles.new },
        ]}
      />
      <h2 className={s.title}>Новая статья</h2>
      <NewArticle />
    </div>
  );
};

export default NewArticlePage;
