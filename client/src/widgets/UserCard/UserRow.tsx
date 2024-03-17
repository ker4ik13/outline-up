"use client";

import { appLinks } from "@/shared/constants";
import { getColorFromRole } from "@/shared/helpers";
import { useAuth } from "@/shared/helpers/auth";
import type { User } from "@/shared/types/user";
import { Email } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardOverflow,
  Chip,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/joy";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
  user: User;
  openBlockModal: (user: User) => void;
  openUnblockModal: (user: User) => void;
}

export const UserRow = ({ user, openBlockModal, openUnblockModal }: Props) => {
  const auth = useAuth();
  return (
    <Card
      color={
        auth.user?._id === user._id
          ? "success"
          : user.blocked?.isBlocked
          ? "danger"
          : undefined
      }
      variant={auth.user?._id === user._id ? "soft" : "outlined"}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1}>
          {user.info.photo ? (
            <Avatar src={user.info.photo} size="lg" />
          ) : (
            <Avatar size="lg">{user.info.firstName[0]}</Avatar>
          )}
          <Stack spacing={1}>
            <Stack direction="row" alignItems="flex-start" spacing={1}>
              <Typography>{`${user.info.firstName} ${user.info.lastName}`}</Typography>
              {user.info.userName && (
                <Typography textColor="primary.400">
                  ({user.info.userName})
                </Typography>
              )}
            </Stack>
            <Stack direction="row" gap={1}>
              {user.roles.map((role, index) => (
                <Chip
                  size="sm"
                  key={index}
                  variant="solid"
                  color={getColorFromRole(role)}
                >
                  {role}
                </Chip>
              ))}
            </Stack>
            {user.info.contactEmail && (
              <Typography>
                <Email /> {user.info.contactEmail}
              </Typography>
            )}
            <Typography>
              <Email /> ker4ik13@kdsa.ru
            </Typography>
          </Stack>
        </Stack>
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
            sx={{
              backgroundColor: "var(--joy-palette-background-body)",
            }}
          >
            <BsThreeDotsVertical />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              p: 1,
              gap: 1,
              borderRadius: "lg",
              transition: "background-color 0.3s ease-in-out",
            }}
            variant="outlined"
            color="neutral"
          >
            <ButtonGroup orientation="vertical">
              <MenuItem
                sx={{
                  m: 0,
                  p: 0,
                }}
              >
                <Button
                  href={
                    auth.user?._id !== user._id
                      ? user.info.userName
                        ? appLinks.admin.users.view(user.info.userName)
                        : appLinks.admin.users.view(user._id)
                      : appLinks.admin.profile.me
                  }
                  color="neutral"
                  size="md"
                  fullWidth
                  variant="outlined"
                  component={"a"}
                >
                  Перейти
                </Button>
              </MenuItem>
              {auth.user?._id !== user._id && (
                <MenuItem
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                >
                  <Button
                    color={user.blocked?.isBlocked ? "primary" : "danger"}
                    size="md"
                    variant="solid"
                    component={"button"}
                    type="button"
                    fullWidth
                    onClick={
                      user.blocked?.isBlocked
                        ? () => openUnblockModal(user)
                        : () => openBlockModal(user)
                    }
                  >
                    {user.blocked?.isBlocked
                      ? "Разблокировать"
                      : "Заблокировать"}
                  </Button>
                </MenuItem>
              )}
            </ButtonGroup>
          </Menu>
        </Dropdown>
      </Stack>
      {user.blocked && user.blocked.isBlocked && (
        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <CardActions sx={{ alignSelf: "flex-start", pt: 1 }}>
            <Typography color="danger">
              Пользователь заблокирован. Причина: {user.blocked.blockReason}
            </Typography>
          </CardActions>
        </CardOverflow>
      )}
    </Card>
  );
};
