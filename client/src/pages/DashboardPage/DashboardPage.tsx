"use client";

import { language, translate } from "@/data/admin/translate";
import { Empty } from "@/shared/ui";
import s from "../GeneralPage.module.scss";

const DashboardPage = () => {
  return (
    <div className={s.page}>
      <h2 className={s.title}>{translate.main.title[language]}</h2>
      <Empty title="В разработке" />
    </div>
  );
};

export default DashboardPage;
