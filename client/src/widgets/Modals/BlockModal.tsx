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
import { useForm } from "react-hook-form";

interface BlockModalProps {
  user: User;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  afterBlock?: (...args: any) => void;
}

export const BlockModal = ({
  user,
  afterBlock,
  isOpenModal,
  isLoading,
  setIsLoading,
  setIsOpenModal,
}: BlockModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BlockUser>();

  const handleBlockUser = async (userDto: BlockUser) => {
    if (errors.blockReason) {
      return;
    }

    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      await UserService.blockUser({
        userId: user._id,
        blockReason: userDto.blockReason,
      });

      if (afterBlock) {
        afterBlock();
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
            placeholder="Причина блокировки"
            {...register("blockReason", {
              required: {
                value: true,
                message: '"Причина блокировки" обязательно к заполнению',
              },
              minLength: 8,
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
              onClick={() => setIsOpenModal(false)}
            >
              Отменить
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="danger"
              onClick={handleSubmit(handleBlockUser)}
              loading={isLoading}
            >
              Заблокировать
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </Modal>
  );
};
