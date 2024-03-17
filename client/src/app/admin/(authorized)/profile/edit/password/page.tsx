"use client";

import s from "@/pages/GeneralPage.module.scss";
import { appLinks } from "@/shared/constants";
import { useAuth } from "@/shared/helpers/auth";
import { PersonalInfoPassword } from "@/widgets/PersonalInfo";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Link as JoyLink, Typography } from "@mui/joy";
import Link from "next/link";
import { useEffect } from "react";
import { IoHome } from "react-icons/io5";

const EditPasswordPage = () => {
  const { isAuth, user, getUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuth || !user) {
      getUser();
    }
  }, []);

  return (
    <div className={s.page}>
      <Breadcrumbs separator={<KeyboardArrowRight />} size="sm">
        <JoyLink
          color="neutral"
          href={appLinks.admin.dashboard}
          component={Link}
        >
          <IoHome />
        </JoyLink>
        <JoyLink
          href={appLinks.admin.profile.me}
          component={Link}
          color="neutral"
        >
          Мой профиль
        </JoyLink>
        <JoyLink
          href={appLinks.admin.profile.edit}
          component={Link}
          color="neutral"
        >
          Редактировать
        </JoyLink>
        <JoyLink
          href={appLinks.admin.profile.changePass}
          component={Link}
          color="primary"
        >
          Изменить пароль
        </JoyLink>
      </Breadcrumbs>
      <Typography level="h2" fontWeight={600} mb={2}>
        Изменить пароль
      </Typography>
      {!isLoading && user && <PersonalInfoPassword user={user} />}
    </div>
  );
};

export default EditPasswordPage;
