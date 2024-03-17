"use client";

import LoginPage from "@/app/admin/(unauthorized)/auth/signin/page";
import { UserService } from "@/services/admin";
import { getColorFromRole } from "@/shared/helpers";
import { useAuth } from "@/shared/helpers/auth";
import { BlockUser, User } from "@/shared/types/user";
import { AspectRatio, Avatar, Card, Chip, Stack, Typography } from "@mui/joy";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { FaToolbox } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface UserCard {
  user: User;
}

export const UserCard = ({ user }: UserCard) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    auth.getUser();
  }, []);

  if (!auth.user) {
    return <LoginPage />;
  }

  const handleBlockUser = async (userDto: BlockUser) => {
    setIsLoading(true);
    try {
      const response = await UserService.blockUser({
        userId: user._id,
        blockReason: userDto.blockReason,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockUser = async () => {
    setIsLoading(true);
    try {
      const response = await UserService.unBlockUser(user._id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card color={user.blocked && user.blocked.isBlocked ? "danger" : "neutral"}>
      {user.blocked && user.blocked.isBlocked && (
        <Stack>
          <Typography textColor="danger.500">
            Пользователь заблокирован!
          </Typography>
          <Typography textColor="danger.200">Причина: Спам</Typography>
        </Stack>
      )}
      <Stack
        direction="row"
        spacing={3}
        sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
      >
        <Stack direction="column" spacing={1}>
          <AspectRatio
            ratio="1"
            maxHeight={120}
            sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
          >
            {user.info.photo ? (
              <Image
                src={user.info.photo}
                alt={user.info.firstName}
                width={120}
                height={120}
              />
            ) : (
              <Avatar
                sx={{ width: 120, height: 120, fontSize: "3rem" }}
                variant="soft"
              >
                {user.info.firstName[0]}
              </Avatar>
            )}
          </AspectRatio>
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <Typography level="h3">{`${user.info.firstName} ${user.info.lastName}`}</Typography>
            {user.info.userName && (
              <Typography level="h3" textColor="primary.300">
                {`(${user.info.userName})`}
              </Typography>
            )}
          </Stack>
          <Typography>{user.email}</Typography>
          {user.info.job && user.info.job.position && (
            <Chip startDecorator={<FaToolbox />}>{user.info.job.position}</Chip>
          )}
        </Stack>
      </Stack>
      {user.info.status && (
        <Stack>
          <Typography startDecorator={<FaPencil />}>
            {user.info.status}
          </Typography>
        </Stack>
      )}
      <Stack direction="column" gap={1} flexWrap="wrap">
        <Stack direction="row">
          {user.updatedAt && (
            <Typography startDecorator={<BsClockHistory />}>
              {`Последнее обновление: ${new Date(
                user.updatedAt
              ).toLocaleDateString("ru")}`}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          {user.roles.map((role, index) => (
            <Chip color={getColorFromRole(role)} key={index}>
              {role}
            </Chip>
          ))}
        </Stack>
      </Stack>
      {/* <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          {auth.user?._id !== user._id && (
            <Button size="sm" variant="solid" color="danger">
              Заблокировать
            </Button>
          )}

          {auth.user?._id === user._id && (
            <Button
              size="sm"
              variant="solid"
              color="primary"
              href={appLinks.admin.profile.edit}
              component={Link}
            >
              Редактировать
            </Button>
          )}
        </CardActions>
      </CardOverflow> */}
    </Card>
  );
};
