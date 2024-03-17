import s from "@/pages/GeneralPage.module.scss";
import { List, ListItem, Typography } from "@mui/joy";

const DocsArticlesPage = () => {
  return (
    <div className={s.page}>
      <Typography level="h2">Документация (Статьи)</Typography>
      <Typography
        level="body-lg"
        fontWeight={600}
        textColor="text.primary"
        textAlign="center"
      >
        Для разработчиков:
      </Typography>
      <Typography textColor="text.primary">Статьи имеют поля:</Typography>
      <List component="ol" marker="disc">
        <ListItem>
          <Typography textColor="text.primary">Уникальный id</Typography>
          <Typography textColor="text.primary">Заголовок</Typography>
          <Typography textColor="text.primary">Slug (URL / ссылка)</Typography>
          <Typography textColor="text.primary">Превью фото</Typography>
          <Typography textColor="text.primary">Автор</Typography>
          <Typography textColor="text.primary">Контент</Typography>
          <Typography textColor="text.primary">
            Статус (draft | published)
          </Typography>
          <Typography textColor="text.primary">
            Количество просмотров
          </Typography>
          <Typography textColor="text.primary">Теги</Typography>
          <Typography textColor="text.primary">Дата создания</Typography>
          <Typography textColor="text.primary">Дата обновления</Typography>
          <Typography textColor="text.primary">Дата публикации</Typography>
          <Typography textColor="text.primary">Заголовок - title</Typography>
          <Typography textColor="text.primary">
            Описание - description
          </Typography>
          <Typography textColor="text.primary">
            Ключевые слова - keywords
          </Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default DocsArticlesPage;
