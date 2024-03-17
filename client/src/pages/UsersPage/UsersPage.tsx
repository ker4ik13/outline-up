"use client";

import { language, translate } from "@/data/admin/translate";
import { UserService } from "@/services/admin";
import { appLinks } from "@/shared/constants";
import { PageMetaDto, PageOptionsDto, type PageDto } from "@/shared/dtos/page";
import { isRoleIncludes } from "@/shared/helpers";
import { useAuth } from "@/shared/helpers/auth";
import { useDebouncedCallback, usePagination } from "@/shared/helpers/hooks";
import { useBlockUser } from "@/shared/helpers/hooks/useBlockUser";
import { IError } from "@/shared/types/IError";
import { UserRoles } from "@/shared/types/role";
import { User } from "@/shared/types/user";
import { CustomBreadcrumbs, Empty } from "@/shared/ui";
import { UserRow } from "@/widgets/UserCard";
import { Search, UpdateOutlined } from "@mui/icons-material";
import { Button, Input, LinearProgress, Stack } from "@mui/joy";
import { type AxiosError } from "axios";
import { useEffect, useState } from "react";
import s from "../GeneralPage.module.scss";

const UsersPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<PageDto<User>>({
    data: [],
    meta: {
      take: 20,
      page: 1,
    } as PageMetaDto,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<IError>({
    isError: false,
    text: "",
  } as IError);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsers = async (
    options: PageOptionsDto = new PageOptionsDto({
      take: users.meta.take,
    })
  ) => {
    setIsLoading(true);

    try {
      const response = await UserService.getAllUsers(options);
      console.log(response.data.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
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

  const { openBlockModal, openUnblockModal, BlockModal, UnblockModal } =
    useBlockUser({
      user: selectedUser || ({} as User),
      afterAction: getUsers,
    });

  const { PaginationButtons } = usePagination({
    ...users.meta,
    getItems: getUsers,
  });

  const onSearch = useDebouncedCallback((value: string) => {
    getUsers(new PageOptionsDto({ search: value, take: users.meta.take }));
  }, 500);

  useEffect(() => {
    getUsers();
  }, []);

  const openCustomBlockModal = (user: User) => {
    setSelectedUser(user);
    openBlockModal();
  };
  const openCustomUnblockModal = (user: User) => {
    setSelectedUser(user);
    openUnblockModal();
  };

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
      {selectedUser && (
        <>
          <BlockModal />
          <UnblockModal />
        </>
      )}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          pages={[{ label: "Пользователи", link: appLinks.admin.users.main }]}
        />
        {user &&
          isRoleIncludes(
            [UserRoles.Creator, UserRoles.Admin, UserRoles.Editor],
            user.roles
          ) && (
            <Input
              placeholder="Найти..."
              variant="plain"
              onChange={(e) => onSearch(e.target.value)}
              endDecorator={<Search />}
            />
          )}
      </Stack>
      <Stack
        width="100%"
        justifyContent="space-between"
        direction="row"
        alignItems="flex-end"
        position="relative"
      >
        <h2 className={s.title}>{translate.sidebar.users[language]}</h2>
        {user &&
          isRoleIncludes(
            [UserRoles.Creator, UserRoles.Admin, UserRoles.Editor],
            user.roles
          ) && (
            <>
              <PaginationButtons
                sx={{
                  position: "absolute",
                  left: "50%",
                  bottom: 0,
                  transform: "translateX(-50%)",
                }}
              />
              <Button
                variant="solid"
                color="primary"
                onClick={() => getUsers()}
                loadingPosition="start"
                loading={isLoading}
                startDecorator={<UpdateOutlined />}
              >
                Обновить
              </Button>
            </>
          )}
      </Stack>
      <div className={s.pageWrapper}>
        {!isLoading && !users.data.length && !isError.isError && (
          <Empty title="Пользователей нет" />
        )}
        {!isLoading && isError.isError && (
          <Empty
            title={`Произошла ошибка: ${isError.text}`}
            description={`Код ошибки: ${isError.status}`}
          />
        )}

        {users.data.length && (
          <Stack gap={1}>
            {users.data.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                openBlockModal={openCustomBlockModal}
                openUnblockModal={openCustomUnblockModal}
              />
            ))}
          </Stack>
        )}
        {/* Добавить роли пользователей */}
      </div>
    </div>
  );
};

export default UsersPage;
