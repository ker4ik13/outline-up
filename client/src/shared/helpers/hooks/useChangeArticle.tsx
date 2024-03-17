import { ArticlesService } from "@/services/admin";
import { Article } from "@/shared/types/article";
import { ArticleCard } from "@/widgets/ArticleCard/ArticleCard";
import {
  Button,
  Card,
  CardActions,
  CardOverflow,
  Modal,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import { useState } from "react";

interface Props {
  afterAction?: (...args: any) => void;
}

export const useChangeArticle = ({ afterAction }: Props) => {
  const [article, setArticle] = useState<Article>({} as Article);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenToggleModal, setIsOpenToggleModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const deleteArticle = async () => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      await ArticlesService.deleteArticle(article.slug);

      if (afterAction) {
        afterAction();
      }

      setIsOpenDeleteModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };

  const toggleArticleStatus = async () => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      await ArticlesService.changeArticle(article.slug, {
        status: article.status === "draft" ? "published" : "draft",
      });

      if (afterAction) {
        afterAction();
      }
      setIsOpenToggleModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };

  const DeleteModal = () => (
    <Modal
      open={isOpenDeleteModal}
      onClose={() => setIsOpenDeleteModal(false)}
      id="delete-article-modal"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={1} alignItems="center">
          <Stack
            direction="row"
            spacing={10}
            justifyContent="space-between"
            alignItems="center"
            alignSelf="flex-start"
            paddingRight={10}
            mb={2}
          >
            <Typography fontWeight={600} level="h4">
              Вы действительно хотите удалить статью?
            </Typography>
            <ModalClose variant="outlined" size="md"></ModalClose>
          </Stack>
          <ArticleCard article={article} withoutDropdown />
        </Stack>
        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button
              size="sm"
              variant="solid"
              color="primary"
              onClick={() => setIsOpenDeleteModal(false)}
            >
              Отменить
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="danger"
              onClick={deleteArticle}
              loading={isLoading}
            >
              Удалить
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </Modal>
  );

  const ToggleModal = () => (
    <Modal
      open={isOpenToggleModal}
      onClose={() => setIsOpenToggleModal(false)}
      id="delete-article-modal"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={1} alignItems="center">
          <Stack
            direction="row"
            spacing={10}
            justifyContent="space-between"
            alignItems="center"
            alignSelf="flex-start"
            paddingRight={10}
            mb={2}
          >
            <Typography fontWeight={600} level="h4">
              {article.status === "draft"
                ? "Вы действительно хотите опубликовать статью?"
                : "Вы действительно хотите снять статью с публикации?"}
            </Typography>
            <ModalClose variant="outlined" size="md"></ModalClose>
          </Stack>
          <ArticleCard article={article} withoutDropdown />
        </Stack>
        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button
              size="sm"
              variant="solid"
              color="primary"
              onClick={() => setIsOpenToggleModal(false)}
            >
              Отменить
            </Button>
            <Button
              size="sm"
              variant="solid"
              color={article.status === "draft" ? "success" : "warning"}
              onClick={toggleArticleStatus}
              loading={isLoading}
            >
              {article.status === "draft"
                ? "Опубликовать"
                : "Снять с публикации"}
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </Modal>
  );

  const openDeleteModal = (article: Article) => {
    console.log("open modal");
    setArticle(article);
    setIsOpenDeleteModal(true);
  };
  const openToggleModal = (article: Article) => {
    setArticle(article);
    setIsOpenToggleModal(true);
  };

  return {
    isArticlesLoading: isLoading,
    isOpenDeleteModal,
    isOpenToggleModal,
    DeleteModal,
    ToggleModal,
    openDeleteModal,
    openToggleModal,
  };
};
