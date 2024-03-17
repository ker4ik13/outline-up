import { language, translate } from "@/data/admin/translate";
import s from "../GeneralPage.module.scss";

const DocsPage = () => {
  return (
    <div className={s.page}>
      <h2 className={s.title}>{translate.sidebar.documentation[language]}</h2>
      <div className={s.docsWrapper}>
        <div className={s.pageWrapper}>
          {/* <ul>
            <li>
              <Link href={`#dashboard`}>
                {translate.sidebar.dashboard[language]}
              </Link>
            </li>
            <li>
              <Link href={`#orders`}>{translate.sidebar.orders[language]}</Link>
            </li>
            <li>
              <Link href={`#users`}>{translate.sidebar.users[language]}</Link>
            </li>
            <li>
              <Link href={`#articles`}>
                {translate.sidebar.articles[language]}
              </Link>
            </li>
            <li>
              <Link href={`#wallet`}>{translate.sidebar.wallet[language]}</Link>
            </li>
            <li>
              <Link href={`#responses`}>
                {translate.sidebar.responses[language]}
              </Link>
            </li>
            <li>
              <Link href={`#mailings`}>
                {translate.sidebar.mailings[language]}
              </Link>
            </li>
            <li>
              <Link href={`#help`}>{translate.sidebar.help[language]}</Link>
            </li>
            <li>
              <Link href={`#tools`}>{translate.sidebar.tools[language]}</Link>
            </li>
            <li>
              <Link href={`#my-profile`}>
                {translate.header.myProfile[language]}
              </Link>
            </li>
            <li>
              <Link href={`#settings`}>
                {translate.header.settings[language]}
              </Link>
            </li>
          </ul> */}
          <h3 id="dashboard">{translate.sidebar.dashboard[language]}</h3>
          <p>
            Страница <b>Дашборд</b> является главной в админ панели. Там
            находится вся общая информация о сайте вашей компании, например:
          </p>
          <ul>
            <li>Заказы вашей продукции</li>
            <li>Недавние опубликованные статьи</li>
            <li>Ваши сбережения на текущий счет</li>
            <li>Отклики с форм обратной связи</li>
          </ul>
          <hr />
          <h3 id="orders">{translate.sidebar.orders[language]}</h3>
          <p>
            На странице <b>Заказы</b> находятся все клиенты, заказавшие
            продукцию вашей компании.
          </p>
          <hr />
          <h3 id="users">{translate.sidebar.users[language]}</h3>
          <p>
            На данной странице находятся все пользователи этой админ панели.
          </p>
          <hr />
          <h3 id="articles">{translate.sidebar.articles[language]}</h3>
          <p>
            На страницы <b>Статьи</b> находятся все статьи которые опубликованы
            на вашем сайте. Можно добавлять, редактировать и удалять статьи,
            если у вас есть права на это.
          </p>
          <hr />
          <h3 id="wallet">{translate.sidebar.wallet[language]}</h3>
          <p>
            На данной странице находится счет вашей компании, если вы конечно
            будете его вести.
          </p>
          <p>
            Можно добавлять расходы и доходы, следить за тратами и смотреть
            статистику по месяцам.
          </p>
          <hr />
          <h3 id="responses">{translate.sidebar.responses[language]}</h3>
          <p>
            На странице <b>Отклики</b> находятся все пользователи, которые
            оставили отклик в форме обратной связи. Можно просматривать всю
            информацию о них, или сделать новым клиентом.
          </p>
          <hr />
          <h3 id="mailings">{translate.sidebar.mailings[language]}</h3>
          <p>
            На странице <b>Рассылки</b> можно отправлять письма на любые
            электронные адреса и просматривать их.
          </p>
          <hr />
          <h3 id="help">{translate.sidebar.help[language]}</h3>
          <p>
            На странице <b>Помощь</b> находятся ответы на самые часто задаваемые
            вопросы.
          </p>
          <hr />
          <h3 id="tools">{translate.sidebar.tools[language]}</h3>
          <p>
            На странице <b>Инструменты</b> находятся различные полезные
            инструменты, которые иногда пригождаются в рутинной работе,
            например:
          </p>
          <ul>
            <li>Удалить отступы в тексте</li>
            <li>Заменить буквы или символы в тексте</li>
          </ul>
          <hr />
          <h3 id="my-profile">{translate.header.myProfile[language]}</h3>
          <p>
            На данной странице можно посмотреть и добавить информацию о себе.
            Изменить пароль, добавить ссылки на соц. сети или поменять фото.
          </p>
          <hr />
          <h3 id="settings">{translate.header.settings[language]}</h3>
          <p>
            На странице находятся различные настройки для админ-панели. Поменять
            темную тему, изменить язык и так далее.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
