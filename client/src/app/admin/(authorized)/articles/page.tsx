"use client";

import s from "@/pages/GeneralPage.module.scss";
import { ArticlesService } from "@/services/admin";
import { appLinks } from "@/shared/constants";
import { PageDto, PageMetaDto, PageOptionsDto } from "@/shared/dtos/page";
import { isRoleIncludes } from "@/shared/helpers";
import { useAuth } from "@/shared/helpers/auth";
import {
  useChangeArticle,
  useDebouncedCallback,
  usePagination,
} from "@/shared/helpers/hooks";
import type { IError } from "@/shared/types";
import type { Article } from "@/shared/types/article";
import { UserRoles } from "@/shared/types/role";
import { CustomBreadcrumbs, Empty } from "@/shared/ui";
import { ArticleCard } from "@/widgets/ArticleCard/ArticleCard";
import { Search, UpdateOutlined } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Input,
  LinearProgress,
  Stack,
} from "@mui/joy";
import { type AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";

const ArticlesPage = () => {
  const { isAuth, user, getUser } = useAuth();
  const [articles, setArticles] = useState<PageDto<Article>>({
    data: [],
    meta: { take: 8, page: 1 } as PageMetaDto,
  });
  const [isError, setIsError] = useState<IError>({
    isError: false,
    text: "",
  } as IError);
  const [isLoading, setIsLoading] = useState(false);

  const getArticles = async (
    customOptions: PageOptionsDto = new PageOptionsDto({
      take: articles.meta.take,
    })
  ) => {
    setIsLoading(true);
    try {
      const articles = await ArticlesService.getArticles(customOptions);
      console.log(articles);
      setArticles(articles);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsError({
        isError: true,
        text: "Произошла ошибка при получении данных",
        status: axiosError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = useDebouncedCallback((value: string) => {
    getArticles(
      new PageOptionsDto({ search: value, take: articles.meta.take })
    );
  }, 500);

  const { DeleteModal, openDeleteModal, openToggleModal, ToggleModal } =
    useChangeArticle({
      afterAction: getArticles,
    });

  const { PaginationButtons } = usePagination({
    ...articles.meta,
    getItems: getArticles,
  });

  useEffect(() => {
    if (!isAuth || !user) {
      getUser();
    }
    getArticles();
  }, []);

  return (
    <div className={s.page}>
      {isLoading && (
        <LinearProgress
          variant="solid"
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            zIndex: 5,
            width: 300,
            transform: "translateX(-50%)",
          }}
        />
      )}
      <DeleteModal />
      <ToggleModal />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          pages={[{ label: "Статьи", link: appLinks.admin.articles.main }]}
        />
        <Input
          placeholder="Найти..."
          variant="plain"
          onChange={(e) => onSearch(e.target.value)}
          endDecorator={<Search />}
        />
      </Stack>
      <Stack
        spacing={3}
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
        position="relative"
      >
        <h2 className={s.title}>Статьи</h2>
        <PaginationButtons
          sx={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
          }}
        />
        <Stack
          alignItems="center"
          justifyContent="center"
          direction="row"
          gap={3}
        >
          <ButtonGroup variant="solid" color="primary">
            <Button
              size="md"
              variant="solid"
              onClick={() => getArticles()}
              loadingPosition="start"
              loading={isLoading}
              startDecorator={<UpdateOutlined />}
            >
              Обновить
            </Button>

            {user &&
              isRoleIncludes(
                [UserRoles.Admin, UserRoles.Editor, UserRoles.Admin],
                user.roles
              ) && (
                <Button
                  href={appLinks.admin.articles.new}
                  size="md"
                  variant="solid"
                  component={"a"}
                  endDecorator={<BsPlusCircle />}
                >
                  Создать
                </Button>
              )}
          </ButtonGroup>
        </Stack>
      </Stack>
      <p>Сортировка...</p>

      {!articles.data.length && isLoading && (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          mt={5}
        >
          <CircularProgress size="lg" />
        </Stack>
      )}

      {articles.data && articles.data.length > 0 && (
        <Stack
          width="100%"
          height="100%"
          alignItems="stretch"
          justifyContent="flex-start"
          direction="row"
          flexWrap="wrap"
          gap={3}
          mt={5}
        >
          {articles.data.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              openDeleteModal={openDeleteModal}
              openToggleModal={openToggleModal}
            />
          ))}
        </Stack>
      )}

      {!articles.data.length && !isError.isError && (
        <Empty title="Статьи не найдены">
          <Button
            href={appLinks.admin.articles.new}
            size="md"
            variant="solid"
            component={"a"}
            fullWidth
          >
            Создать
          </Button>
        </Empty>
      )}

      {!articles.data.length && isError.isError && (
        <Empty
          title="Произошла ошибка"
          description="Ошибка при получении статей, попробуйте обновить страницу!"
        />
      )}
    </div>
  );
};

export default ArticlesPage;
