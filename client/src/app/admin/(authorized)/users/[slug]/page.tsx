"use client";

import s from "@/pages/GeneralPage.module.scss";
import { UserService } from "@/services/admin";
import { appLinks } from "@/shared/constants";
import { NextParamsPage } from "@/shared/types";
import { IError } from "@/shared/types/IError";
import { User } from "@/shared/types/user";
import { CustomBreadcrumbs, Empty } from "@/shared/ui";
import { UserCard, UserCardSkeleton } from "@/widgets/UserCard";
import { type AxiosError } from "axios";
import { useEffect, useState } from "react";

const CurrentUserPage = ({ params }: NextParamsPage) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<IError>({
    isError: false,
    text: "",
  } as IError);
  const [user, setUser] = useState<User | undefined>(undefined);

  const getUser = async () => {
    setIsLoading(true);

    try {
      const response = await UserService.getUserByIdOrSlug(params.slug);
      setUser(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        setIsError({
          isError: true,
          text: "У вас нет прав для выполнения данного действия",
          status: axiosError.response?.status,
        });
        return;
      }
      setIsError({
        isError: true,
        text: "Произошла ошибка при получении данных",
        status: axiosError.response?.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={s.page}>
      {user ? (
        <CustomBreadcrumbs
          pages={[
            { label: "Пользователи", link: appLinks.admin.users.main },
            {
              label: `${user.info.firstName} ${user.info.lastName}`,
              link: `${appLinks.admin.users.main}/${user._id}`,
            },
          ]}
        />
      ) : (
        <CustomBreadcrumbs
          pages={[{ label: "Пользователи", link: appLinks.admin.users.main }]}
        />
      )}
      <h2 className={s.title}>
        {!user
          ? isLoading
            ? "Загрузка..."
            : "Ошибка"
          : `${user.info.firstName} ${user.info.lastName}`}
      </h2>
      <div className={s.pageWrapper}>
        {isLoading && !user && <UserCardSkeleton />}
        {!isLoading && user && <UserCard user={user} />}
        {!isLoading && !user && !isError.isError && (
          <Empty title="Пользователь не найден" />
        )}
        {!isLoading && isError.isError && (
          <Empty
            title={`Произошла ошибка: ${isError.text}`}
            description={`Код ошибки: ${isError.status}`}
          />
        )}
      </div>
    </div>
  );
};

export default CurrentUserPage;
