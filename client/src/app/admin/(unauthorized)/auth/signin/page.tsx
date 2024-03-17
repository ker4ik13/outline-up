"use client";

import s from "@/pages/LoginPage/LoginPage.module.scss";
import { appLinks } from "@/shared/constants";
import { useAuth } from "@/shared/helpers/auth";
import type { IError } from "@/shared/types/IError";
import { LoginUser } from "@/shared/types/user/LoginUser";
import { ToggleThemeButton } from "@/shared/ui";
import { showNotification } from "@/widgets/Notification/utils/showNotification";
import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLockOutline, MdMailOutline } from "react-icons/md";

const LoginPage = () => {
  const [errors, setErrors] = useState<IError[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginUser>({
    mode: "onBlur",
  });
  const { signin, isAuth, user } = useAuth();

  const onSubmit = async (values: LoginUser) => {
    setLoading(true);
    setErrors([]);

    try {
      const user = await signin(values);

      if (user) {
        showNotification(`Успешный вход`, {
          type: "success",
          autoClose: 2000,
        });
        setLoading(false);
        router.push(appLinks.admin.dashboard);
        return;
      }

      if (!user) {
        const errors: IError[] = [];

        errors.push({
          isError: true,
          text: "Неправильный логин или пароль!",
        });

        setErrors(errors);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  if (isAuth && user) {
    return (
      <div className={s.page}>
        <Typography level="h3" fontWeight="lg">
          Здравствуйте, {user.info.firstName}
        </Typography>
        <br />
        <Divider>Страницы</Divider>
        <br />
        <ButtonGroup color="primary">
          <Button variant="solid" href={appLinks.admin.dashboard} component="a">
            Дашборд
          </Button>
          <Button
            variant="solid"
            href={appLinks.admin.articles.main}
            component="a"
          >
            Статьи
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  return (
    <div className={s.page}>
      {errors.length > 0 &&
        errors.map((error) => (
          <p className="error_text" key={error.text}>
            {error.text}
          </p>
        ))}
      <Card
        className={s.card}
        component={"div"}
        variant="outlined"
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
            Войти в аккаунт
          </Typography>

          {/* Тема */}
          <ToggleThemeButton size="md" />
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <FormControl orientation="vertical">
            <FormLabel>Почта</FormLabel>
            <Input
              error={errors.length > 0}
              placeholder="youremail@gmail.com"
              type="email"
              id="email"
              {...register("email", {
                required: true,
              })}
              autoComplete="email"
              startDecorator={<MdMailOutline />}
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Пароль</FormLabel>
            <Input
              error={errors.length > 0}
              placeholder="Пароль"
              type="password"
              id="password"
              {...register("private.password", {
                required: true,
                minLength: 8,
              })}
              autoComplete="password"
              startDecorator={<MdLockOutline />}
              required
            />
            <br />
            <Link className={s.link} href={appLinks.admin.auth.registration}>
              Нет аккаунта? Создать
            </Link>
            <Button
              loading={loading}
              loadingPosition="start"
              fullWidth
              variant="solid"
              type="submit"
            >
              Войти
            </Button>
          </FormControl>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
