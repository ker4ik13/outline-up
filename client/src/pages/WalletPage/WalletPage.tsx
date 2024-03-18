import { Empty } from "@/shared/ui/admin";
import s from "../GeneralPage.module.scss";

const WalletPage = () => {
  return (
    <div className={s.page}>
      <h2 className={s.title}>Кошелек</h2>
      <Empty title="В разработке" />
    </div>
  );
};

export default WalletPage;
