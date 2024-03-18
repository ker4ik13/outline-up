import { Empty } from "@/shared/ui/admin";
import s from "../GeneralPage.module.scss";

const OrdersPage = () => {
  return (
    <div className={s.page}>
      <h2 className={s.title}>Заказы</h2>
      <Empty title="В разработке" />
    </div>
  );
};

export default OrdersPage;
