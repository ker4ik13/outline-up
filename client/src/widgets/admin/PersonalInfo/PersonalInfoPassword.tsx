import { useAuth } from "@/shared/helpers/auth";
import { useDebouncedCallback } from "@/shared/helpers/hooks";
import type { ChangeUser, User, UserPrivateChange } from "@/shared/types/user";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import * as bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";

interface PersonalInfo {
  user: User;
}

export const PersonalInfoPassword = ({ user }: PersonalInfo) => {
  const { updateUser, isLoading } = useAuth();

  const {
    register,
    formState: { isDirty, isValid, errors, dirtyFields },
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<ChangeUser>();

  const submit = async (newUser: ChangeUser) => {
    if (
      !isDirty ||
      errors.private?.password ||
      errors.private?.repeatPassword ||
      !isValid
    ) {
      return;
    }

    const updatedUser: User = {
      ...user,
      ...newUser,
      private: {
        ...user.private,
        ...newUser.private,
        passwordUpdatedAt: new Date().toISOString(),
      },
    };

    if (newUser.private) {
      checkPassword(newUser.private);
    }

    if (newUser.private?.password) {
      updatedUser.private.password = await bcrypt.hash(
        newUser.private.password,
        3
      );
      updatedUser.private.createdAt = user.private.createdAt;
    }

    delete updatedUser.info.photo;

    await updateUser(updatedUser);
    setValue("private.password", ""), setValue("private.repeatPassword", "");
  };

  const checkPassword = (userPrivate: UserPrivateChange) => {
    if (userPrivate.password && userPrivate.repeatPassword) {
      if (userPrivate.password !== userPrivate.repeatPassword) {
        setError("private.repeatPassword", {
          message: "Пароли не совпадают",
          type: "deps",
        });
        setError("private.password", {
          type: "deps",
        });
        return;
      } else {
        clearErrors("private.password");
        clearErrors("private.repeatPassword");
      }
    }
  };

  const debounceCheckPassword = useDebouncedCallback(checkPassword, 500);

  return (
    <Card sx={{ mt: 1 }}>
      {/* Изменение пароля */}
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">Изменить пароль</Typography>
      </Box>
      <Divider />
      <Stack spacing={1} direction="row" alignItems="flex-start">
        {/* Пароли */}
        <FormControl error={!!errors.private?.password}>
          <FormLabel>Новый пароль</FormLabel>
          <Input
            size="sm"
            type="password"
            startDecorator={<FaLock />}
            placeholder="Новый пароль"
            sx={{ flexGrow: 1 }}
            {...register("private.password", {
              minLength: 8,
              required: {
                value: true,
                message: "Введите пароль",
              },
            })}
          />
          {errors.private?.password && (
            <FormHelperText>{errors.private?.password?.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={!!errors.private?.repeatPassword}>
          <FormLabel>Подтвердите пароль</FormLabel>
          <Input
            size="sm"
            type="password"
            startDecorator={<FaLock />}
            placeholder="Новый пароль"
            sx={{ flexGrow: 1 }}
            {...register("private.repeatPassword", {
              minLength: 8,
              required: {
                value: true,
                message: "Повторите пароль",
              },
              onChange: () => {
                const userPrivate = getValues("private");
                if (!userPrivate) return;

                debounceCheckPassword(userPrivate);
              },
            })}
          />
          {errors.private?.repeatPassword && (
            <FormHelperText>
              {errors.private?.repeatPassword?.message}
            </FormHelperText>
          )}
        </FormControl>
      </Stack>
      <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <CardActions sx={{ alignSelf: "flex-start", pt: 2 }}>
          <Button
            size="sm"
            variant="solid"
            onClick={handleSubmit(submit)}
            disabled={!isDirty || !isValid}
            loading={isLoading}
          >
            Изменить
          </Button>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};
