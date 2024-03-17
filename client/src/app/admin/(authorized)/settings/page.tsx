"use client";
import { language, translate } from "@/data/admin/translate";
import s from "@/pages/GeneralPage.module.scss";
import { appLinks } from "@/shared/constants";
import { useToggleTheme } from "@/shared/helpers/hooks/useToggleTheme";
import { CustomBreadcrumbs, Empty } from "@/shared/ui";
import { Switch, useColorScheme } from "@mui/joy";

const SettingsPage = () => {
  const { mode } = useColorScheme();
  const { toggleTheme } = useToggleTheme();

  return (
    <div className={s.page}>
      <CustomBreadcrumbs
        pages={[{ label: "Настройки", link: appLinks.admin.settings }]}
      />
      <h2 className={s.title}>{translate.settings.title[language]}</h2>
      <div className={s.pageWrapper}>
        <div className={s.stringInput}>
          <label htmlFor="theme" className={s.inputLabel}>
            {translate.settings.darkTheme[language]}
          </label>
          <Switch checked={mode === "dark"} onChange={toggleTheme} />
        </div>
      </div>
      <Empty title="В разработке" />
    </div>
  );
};

export default SettingsPage;
