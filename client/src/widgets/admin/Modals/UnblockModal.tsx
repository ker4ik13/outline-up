import { UserService } from "@/services/admin";
import type { BlockUser, User } from "@/shared/types/user";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Chip,
  Modal,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import { useForm } from "react-hook-form";

interface UnblockModalProps {
  user: User;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  afterUnblock?: (...args: any) => void;
}

export const UnblockModal = ({
  afterUnblock,
  isOpenModal,
  setIsOpenModal,
  user,
  isLoading,
  setIsLoading,
}: UnblockModalProps) => {
  const { register, handleSubmit } = useForm<BlockUser>();
  const handleUnblockUser = async () => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      const response = await UserService.unBlockUser(user._id);
      console.log(response.data);
      if (afterUnblock) {
        afterUnblock();
      }
      setIsOpenModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };
  return (
    <Modal
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
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
              onClick={() => setIsOpenModal(false)}
            >
              Отменить
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="primary"
              loading={isLoading}
              onClick={handleUnblockUser}
            >
              Разблокировать
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </Modal>
  );
};
