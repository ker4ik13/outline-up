import { Empty } from "@/shared/ui";
import s from "../GeneralPage.module.scss";

const MailingsPage = () => {
  return (
    <div className={s.page}>
      <h2 className={s.title}>Рассылки</h2>
      <Empty title="В разработке" />

      {/* <Empty description={"Рассылок пока нет"}>
          <Button
            type="primary"
            href="/admin/mailings/new"
            icon={<IoAddOutline />}
          >
            Создать
          </Button>
        </Empty> */}
    </div>
  );
};

export default MailingsPage;
