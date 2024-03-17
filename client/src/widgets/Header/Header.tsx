"use client";

import { getTheme } from "@/features/getTheme";
import Unavailable from "@/shared/Unavailable/Unavailable";
import { showNotification } from "@/widgets/Notification/utils/showNotification";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline, IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut, IoMailOutline } from "react-icons/io5";
import s from "./Header.module.scss";

import { language, translate } from "@/data/admin/translate";
import { appLinks } from "@/shared/constants";
import { useAuth } from "@/shared/helpers/auth";
import { useOnClickOutside } from "@/shared/helpers/hooks";
import { IsActivePage } from "@/shared/types/ui";
import { ToggleThemeButton } from "@/shared/ui";
import {
  Avatar,
  Box,
  Button,
  Dropdown,
  IconButton,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/joy";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";
import { Sidebar } from "../Sidebar/Sidebar";
import { pages } from "../Sidebar/pages";
import { UserAvatar } from "../UserAvatar";

export const Header = () => {
  const { user, isAuth, signout } = useAuth();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const path = usePathname();

  const dropdown = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };
  const closeDropdown = () => {
    setIsOpenDropdown(false);
  };

  useOnClickOutside(dropdown, closeDropdown);

  const showDontWorkingNotification = () => {
    showNotification("Страница пока недоступна", {
      type: "error",
      autoClose: 3000,
      theme: getTheme() ? "dark" : "light",
    });
  };

  useEffect(() => {
    getTheme();
  }, []);

  const isActivePage = (link: string): IsActivePage => {
    return path === link
      ? {
          color: "primary",
          variant: "solid",
        }
      : {
          color: "neutral",
          variant: "plain",
        };
  };

  return (
    <header className={s.header} data-tag="header">
      <div className={s.wrapper}>
        <IconButton variant="outlined" color="neutral" onClick={toggleSidebar}>
          <MdMenu />
        </IconButton>

        <Link href={appLinks.admin.dashboard} className={s.panel}>
          Панель
        </Link>
        {/* <Link href="/" className={s.logoWrapper}>
          <Logo />
        </Link> */}
      </div>
      <Sidebar
        isOpenSidebar={isOpenSidebar}
        onClose={toggleSidebar}
        groupsPages={pages}
      />
      <div className={s.wrapper}>
        <div className={s.messages}>
          <Unavailable onClick={showDontWorkingNotification}>
            <IconButton
              variant="outlined"
              title={translate.header.letters[language]}
              href="#"
              component={Link}
            >
              <IoMailOutline />
            </IconButton>
          </Unavailable>

          <Unavailable onClick={showDontWorkingNotification}>
            <IconButton
              variant="outlined"
              title={translate.header.notifications[language]}
              href="#"
              component={Link}
            >
              <IoIosNotificationsOutline />
            </IconButton>
          </Unavailable>

          <ToggleThemeButton size="md" />
        </div>
        <div className={s.account}>
          <Dropdown>
            <MenuButton
              slots={{ root: Avatar }}
              slotProps={{ root: { variant: "outlined", color: "neutral" } }}
            >
              <UserAvatar user={user} />
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
              ref={dropdown}
            >
              {isAuth && user && (
                <>
                  <MenuItem
                    sx={{
                      m: 0,
                      p: 0,
                    }}
                  >
                    <Button
                      onClick={toggleDropdown}
                      href={appLinks.admin.profile.me}
                      color={isActivePage(appLinks.admin.profile.me).color}
                      size="md"
                      variant={isActivePage(appLinks.admin.profile.me).variant}
                      component={Link}
                    >
                      <Stack alignItems="center" direction={"row"} p={0}>
                        <UserAvatar user={user} />
                        <Box sx={{ ml: 1.5 }}>
                          <Typography level="title-sm" textColor="text.primary">
                            {user.info.firstName} {user.info.lastName}
                          </Typography>
                          <Typography level="body-xs" textColor="text.tertiary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </Button>
                  </MenuItem>
                </>
              )}
              <MenuItem
                sx={{
                  m: 0,
                  p: 0,
                }}
              >
                <Button
                  href={appLinks.admin.settings}
                  onClick={toggleDropdown}
                  fullWidth
                  startDecorator={<IoMdSettings />}
                  color={isActivePage(appLinks.admin.settings).color}
                  variant={isActivePage(appLinks.admin.settings).variant}
                  component={Link}
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  {translate.header.settings[language]}
                </Button>
              </MenuItem>

              <ListDivider />

              {isAuth ? (
                <MenuItem
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                >
                  <Button
                    onClick={signout}
                    startDecorator={<IoLogOut />}
                    color="neutral"
                    fullWidth
                    variant="plain"
                    sx={{
                      justifyContent: "flex-start",
                    }}
                  >
                    {translate.header.logout[language]}
                  </Button>
                </MenuItem>
              ) : (
                <MenuItem
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                >
                  <Button
                    href={appLinks.admin.auth.login}
                    onClick={toggleDropdown}
                    startDecorator={<IoLogIn />}
                    fullWidth
                    color="neutral"
                    variant="plain"
                    component={Link}
                    sx={{
                      justifyContent: "flex-start",
                    }}
                  >
                    {translate.header.login[language]}
                  </Button>
                </MenuItem>
              )}
            </Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
