import { Empty } from "@/shared/ui";
import s from "../GeneralPage.module.scss";

const ResponsesPage = () => {
  return (
    <div className={s.page}>
      <h2 className={s.title}>Отклики</h2>
      <Empty title="В разработке" />

      {/* <Empty description={"Откликов пока нет"} /> */}
      {/* <div className={s.responses}>
          <div className={s.tableWrapper}>
            <p className={s.tableTitle}>Недавние отклики</p>
            <div className={s.tableScroll}>
              <table className={s.responsesTable}>
                <thead>
                  <tr>
                    <th>
                      <span>No.</span>
                    </th>
                    <th>
                      <span>Имя</span>
                    </th>
                    <th>
                      <span>Дата</span>
                    </th>
                    <th>
                      <span>Продукт</span>
                    </th>
                    <th>
                      <span>Телефон</span>
                    </th>
                    <th>
                      <span>Почта</span>
                    </th>
                    <th>
                      <span>Телеграм</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockResponses.map((response, i) => (
                    <tr key={i}>
                      <td>
                        <span>{i + 1}</span>
                      </td>
                      <td>
                        <span>{response.name}</span>
                      </td>
                      <td>
                        <span>{response.createdAt}</span>
                      </td>
                      <td>
                        <span>{response.product}</span>
                      </td>
                      <td>
                        <span>{response.phone}</span>
                      </td>
                      <td>
                        <span>{response.email}</span>
                      </td>
                      <td>
                        <span>{response.tgLink}</span>
                      </td>
                      <td>
                        <span>{response.tgLink}</span>
                      </td>
                      <td>
                        <span>{response.tgLink}</span>
                      </td>
                      <td>
                        <span>{response.tgLink}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
    </div>
  );
};

export default ResponsesPage;
