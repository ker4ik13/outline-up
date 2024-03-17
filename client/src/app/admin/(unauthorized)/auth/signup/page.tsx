"use client";

import s from "@/pages/RegistrationPage/RegistrationPage.module.scss";
import { appLinks } from "@/shared/constants";
import { useAuth } from "@/shared/helpers/auth";
import { useDebouncedCallback } from "@/shared/helpers/hooks";
import type { CreateUserErrorResponse } from "@/shared/types/user";
import type { CreateUserDto } from "@/shared/types/user/CreateUser";
import { ToggleThemeButton } from "@/shared/ui";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import type { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { MdLockOutline, MdMailOutline, MdPeopleOutline } from "react-icons/md";

interface RegistrationUserDto extends CreateUserDto {
  private: {
    password: string;
    repeatPassword: string;
  };
}

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const { registration } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<RegistrationUserDto>({
    mode: "onBlur",
  });

  const onSubmit = async (values: RegistrationUserDto) => {
    try {
      setLoading(true);

      const newUser: CreateUserDto = {
        email: values.email,
        info: {
          lastName: values.info.lastName,
          firstName: values.info.firstName,
        },
        private: {
          password: values.private.password,
        },
      };

      const response = await registration(newUser);

      if (response.status === 201) {
        setLoading(false);
        router.push(appLinks.admin.auth.login);
      }
    } catch (error) {
      const axiosError = error as AxiosError<CreateUserErrorResponse>;
      setLoading(false);

      axiosError.response?.data.errors.map((error) => {
        setError(error.field, {
          message: error.message,
          type: "custom",
        });
      });
    }
  };

  const checkRepeatPassword = (value: string, user: RegistrationUserDto) =>
    user.private.password === value;

  const checkValidEmail = (email: string) => {
    console.log(email);
  };

  const checkDebounceValidEmail = useDebouncedCallback(checkValidEmail, 1000);

  return (
    <Box className={s.page}>
      <Card
        component={"div"}
        variant="outlined"
        color="neutral"
        sx={{
          cursor: "text",
        }}
      >
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Typography level="h3" fontWeight="lg">
            Зарегистрироваться
          </Typography>

          <ToggleThemeButton size="md" />
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <Stack direction="column" gap={1}>
            <FormLabel>
              <Stack gap={1} direction="row" alignItems="center">
                <MdPeopleOutline />
                Имя и фамилия
              </Stack>
            </FormLabel>
            <Stack direction="row">
              {/* Имя */}
              <Input
                sx={{
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                }}
                error={formErrors.info?.firstName ? true : false}
                placeholder="Иван"
                type="text"
                id="firstName"
                {...register("info.firstName", {
                  required: true,
                  minLength: 2,
                })}
                autoComplete="given-name"
                required
              />

              {/* Фамилия */}
              <Input
                sx={{
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                }}
                error={formErrors.info?.lastName ? true : false}
                placeholder="Иванов"
                type="text"
                id="lastName"
                {...register("info.lastName", {
                  required: true,
                  minLength: 2,
                })}
                autoComplete="family-name"
                required
              />
            </Stack>
            {(formErrors.info?.firstName || formErrors.info?.lastName) && (
              <FormHelperText>
                Укажите имя и фамилию не менее 2х символов
              </FormHelperText>
            )}
          </Stack>
          <br />

          {/* Почта */}
          <FormControl
            orientation="vertical"
            error={formErrors.email ? true : false}
          >
            <FormLabel>Почта</FormLabel>
            <Input
              placeholder="youremail@gmail.com"
              type="email"
              id="email"
              {...register("email", {
                required: true,
              })}
              autoComplete="email"
              startDecorator={<MdMailOutline />}
              required
              onChange={(event) => checkDebounceValidEmail(event.target.value)}
            />
            {formErrors.email && (
              <FormHelperText>{formErrors.email.message}</FormHelperText>
            )}
          </FormControl>
          <br />

          {/* Пароль */}
          <FormControl error={formErrors.private?.password ? true : false}>
            <FormLabel>Пароль</FormLabel>
            <Input
              placeholder="Пароль"
              type="password"
              id="password"
              {...register("private.password", {
                required: "Поле обязательно",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
              })}
              autoComplete="password"
              startDecorator={<MdLockOutline />}
              endDecorator={
                <IconButton>
                  <BsEye />
                </IconButton>
              }
              required
            />
            {formErrors.private?.password && (
              <FormHelperText>
                {formErrors.private?.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <br />

          {/* Повторите пароль */}
          <FormControl
            error={formErrors.private?.repeatPassword ? true : false}
          >
            <FormLabel>Повторите пароль</FormLabel>
            <Input
              placeholder="Повторите пароль"
              type="password"
              id="repeatPassword"
              {...register("private.repeatPassword", {
                required: "Поле обязательно",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
                deps: "password",
                validate: checkRepeatPassword,
              })}
              startDecorator={<MdLockOutline />}
              endDecorator={
                <IconButton>
                  <BsEye />
                </IconButton>
              }
              required
            />
            {formErrors.private?.repeatPassword && (
              <FormHelperText>
                {formErrors.private?.repeatPassword.message ||
                  "Пароли не совпадают"}
              </FormHelperText>
            )}
          </FormControl>
          <br />
          <Link className={s.link} href={appLinks.admin.auth.login}>
            Есть аккаунт? Войти
          </Link>
          <Button
            loading={loading}
            loadingPosition="start"
            variant="solid"
            type="submit"
          >
            Создать
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default RegistrationPage;
