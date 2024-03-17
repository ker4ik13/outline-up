"use client";

import s from "@/pages/GeneralPage.module.scss";
import { appLinks } from "@/shared/constants";
import { useAuth } from "@/shared/helpers/auth";
import { CustomBreadcrumbs } from "@/shared/ui";
import { PersonalInfo, PersonalInfoPassword } from "@/widgets/PersonalInfo";
import { UserCard, UserCardSkeleton } from "@/widgets/UserCard";
import { Tab, TabList, TabPanel, Tabs, Typography, tabClasses } from "@mui/joy";
import { useEffect } from "react";

const ProfilePage = () => {
  const { isAuth, user, getUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuth || !user) {
      getUser();
    }
  }, []);

  return (
    <div className={s.page}>
      <CustomBreadcrumbs
        pages={[{ label: "Мой профиль", link: appLinks.admin.profile.me }]}
      />
      <Typography level="h2" fontWeight={600} mb={2}>
        Мой профиль
      </Typography>
      <Tabs
        defaultValue={0}
        sx={{
          pt: 2,
          paddingInline: 2,
          borderRadius: 8,
        }}
      >
        <TabList
          size="sm"
          sx={{
            pl: { xs: 0, md: 4 },
            justifyContent: "left",
            [`&& .${tabClasses.root}`]: {
              fontWeight: "600",
              flex: "initial",
              color: "text.tertiary",
              [`&.${tabClasses.selected}`]: {
                bgcolor: "transparent",
                color: "text.primary",
                "&::after": {
                  height: "2px",
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          {user && (
            <>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={0}
              >
                Профиль
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={1}
              >
                Изменить профиль
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={2}
              >
                Изменить пароль
              </Tab>
            </>
          )}
          {!user && (
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              Профиль
            </Tab>
          )}
        </TabList>
        {user && (
          <>
            <TabPanel value={0}>
              {isLoading && !user && <UserCardSkeleton />}
              {!isLoading && user && <UserCard user={user} />}
            </TabPanel>
            <TabPanel value={1}>
              <PersonalInfo user={user} />
            </TabPanel>
            <TabPanel value={2}>
              <PersonalInfoPassword user={user} />
            </TabPanel>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default ProfilePage;
