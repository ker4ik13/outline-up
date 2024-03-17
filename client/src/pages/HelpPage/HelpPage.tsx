import { appLinks } from "@/shared/constants";
import { CustomBreadcrumbs, Empty } from "@/shared/ui";
import s from "../GeneralPage.module.scss";

const HelpPage = () => {
  return (
    <div className={s.page}>
      <CustomBreadcrumbs
        pages={[{ label: "Помощь", link: appLinks.admin.help }]}
      />
      <h2 className={s.title}>Помощь</h2>
      <Empty title="В разработке" />
    </div>
  );
};

export default HelpPage;
