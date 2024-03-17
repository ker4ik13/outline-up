import { UserService } from "@/services/admin";
import type { BlockUser, User } from "@/shared/types/user";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  user: User;
  afterAction?: (...args: any) => void;
}

export const useBlockUser = ({ user, afterAction }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenBlockModal, setIsOpenBlockModal] = useState(false);
  const [isOpenUnblockModal, setIsOpenUnblockModal] = useState(false);
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
    setValue,
    resetField,
  } = useForm<BlockUser>();

  const blockUser = async (userDto: BlockUser) => {
    if (errors.blockReason) {
      return;
    }

    if (setIsLoading) {
      setIsLoading(true);
    }

    try {
      const response = await UserService.blockUser({
        userId: user._id,
        blockReason: userDto.blockReason,
      });
      console.log(response);
      if (afterAction) {
        afterAction();
      }
      resetField("blockReason");
      setIsOpenBlockModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };

  const unblockUser = async () => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      const response = await UserService.unBlockUser(user._id);
      console.log(response.data);
      if (afterAction) {
        afterAction();
      }
      setIsOpenUnblockModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };

  const BlockModal = () => (
    <Modal
      open={isOpenBlockModal}
      onClose={() => setIsOpenBlockModal(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={10}
            justifyContent="space-between"
            alignItems="center"
            paddingRight={10}
          >
            <Typography fontWeight={600} level="h4">
              Вы действительно хотите заблокировать пользователя?
            </Typography>
            <ModalClose variant="outlined" size="md"></ModalClose>
          </Stack>
          <Card>
            <Stack direction="row" alignItems="center" spacing={1}>
              {user.info.photo ? (
                <Avatar src={user.info.photo}></Avatar>
              ) : (
                <Avatar>{user.info.firstName[0]}</Avatar>
              )}
              <Typography>{`${user.info.firstName} ${user.info.lastName}`}</Typography>
            </Stack>
            <Typography>{user.email}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {user.roles.map((role, index) => (
                <Chip key={index} variant="soft" color="primary" size="sm">
                  {role}
                </Chip>
              ))}
            </Stack>
          </Card>
        </Stack>
        <FormControl error={!!errors.blockReason}>
          <FormLabel>Причина блокировки</FormLabel>
          <Input
            id={id}
            type="text"
            placeholder="Причина блокировки"
            {...register("blockReason", {
              required: {
                value: true,
                message: '"Причина блокировки" обязательно к заполнению',
              },
              minLength: 8,
              onChange: (event) => {
                setValue("blockReason", event.target.value);
                setFocus("blockReason");
              },
            })}
          />
          {errors.blockReason && (
            <FormHelperText>{errors.blockReason.message}</FormHelperText>
          )}
        </FormControl>
        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button
              size="sm"
              variant="solid"
              color="primary"
              onClick={() => setIsOpenBlockModal(false)}
            >
              Отменить
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="danger"
              onClick={handleSubmit(blockUser)}
              loading={isLoading}
            >
              Заблокировать
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </Modal>
  );

  const UnblockModal = () => (
    <Modal
      open={isOpenUnblockModal}
      onClose={() => setIsOpenUnblockModal(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={10}
            justifyContent="space-between"
            alignItems="center"
            paddingRight={10}
          >
            <Typography fontWeight={600} level="h4">
              Вы действительно хотите разблокировать пользователя?
            </Typography>
            <ModalClose variant="outlined" size="md"></ModalClose>
          </Stack>
          <Card color={user.blocked?.isBlocked ? "danger" : "neutral"}>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="flex-start" spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {user.info.photo ? (
                    <Avatar src={user.info.photo}></Avatar>
                  ) : (
                    <Avatar>{user.info.firstName[0]}</Avatar>
                  )}
                  <Typography>{`${user.info.firstName} ${user.info.lastName}`}</Typography>
                </Stack>
              </Stack>
              <Typography>{user.email}</Typography>
              <Stack direction="row">
                {user.roles.map((role, index) => (
                  <Chip size="sm" key={index} variant="solid" color="primary">
                    {role}
                  </Chip>
                ))}
              </Stack>
              {user.blocked?.isBlocked && (
                <>
                  <Typography color="danger">
                    Пользователь заблокирован
                  </Typography>
                  <Typography color="danger">
                    Причина: {user.blocked.blockReason}
                  </Typography>
                </>
              )}
            </Stack>
          </Card>
        </Stack>
        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button
              size="sm"
              variant="outlined"
              color="neutral"
              onClick={() => setIsOpenUnblockModal(false)}
            >
              Отменить
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="primary"
              loading={isLoading}
              onClick={unblockUser}
            >
              Разблокировать
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </Modal>
  );

  const openBlockModal = () => {
    setIsOpenBlockModal(true);
  };
  const openUnblockModal = () => {
    setIsOpenUnblockModal(true);
  };

  return {
    isLoading,
    isOpenBlockModal,
    isOpenUnblockModal,
    BlockModal,
    UnblockModal,
    openBlockModal,
    openUnblockModal,
  };
};
