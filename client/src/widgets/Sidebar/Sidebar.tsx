"use client";

import Unavailable from "@/shared/Unavailable/Unavailable";
import { isRoleIncludes } from "@/shared/helpers";
import { useAuth } from "@/shared/helpers/auth";
import { IsActivePage } from "@/shared/types/ui";
import {
  Box,
  Button,
  Divider,
  Drawer,
  ModalClose,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { GroupPages } from "./pages";

interface SidebarProps {
  isOpenSidebar: boolean;
  onClose: (value: boolean) => void;
  groupsPages: GroupPages[];
}

export const Sidebar = ({
  isOpenSidebar,
  onClose,
  groupsPages,
}: SidebarProps) => {
  const path = usePathname();
  const { user } = useAuth();

  const isActivePage = (link: string): IsActivePage => {
    return path === link
      ? {
          color: "primary",
          variant: "solid",
        }
      : {
          color: "neutral",
          variant: "outlined",
        };
  };

  return (
    <Drawer
      open={isOpenSidebar}
      onClose={onClose}
      size="sm"
      slotProps={{
        content: {
          sx: {
            bgcolor: "transparent",
            p: { md: 2, sm: 0 },
            boxShadow: "none",
          },
        },
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: {
            md: "md",
            sm: "none",
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pb: 4,
          height: "100%",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            ml: "auto",
            mr: "auto",
            p: 2,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingInline: 2,
          }}
        >
          <Typography level="h3" fontWeight={"lg"}>
            Меню
          </Typography>
          <ModalClose
            variant="outlined"
            size="lg"
            sx={{ position: "initial" }}
          />
        </Box>
        <Stack gap={2} flexDirection={"column"} overflow={"auto"} px={1}>
          {groupsPages.map((group, index) => {
            if (
              !group.needRoles ||
              (user && isRoleIncludes(group.needRoles, user.roles))
            ) {
              return (
                <Stack key={index} gap={2}>
                  <Divider
                    sx={{
                      mb: 0.5,
                    }}
                  >
                    {group.groupName}
                  </Divider>
                  <Stack
                    flexDirection={"column"}
                    alignItems={"stretch"}
                    gap={2}
                    width={"90%"}
                    margin={"auto"}
                    key={`${group.groupName}-${index}`}
                  >
                    {group.pages.map((page, index) => {
                      // Если страница имеет роли
                      if (user && page.needRoles) {
                        if (!isRoleIncludes(page.needRoles, user.roles)) {
                          return;
                        }

                        if (page.isUnavailable) {
                          return (
                            <Unavailable
                              key={`${page.name}-${page.link}-${index}`}
                            >
                              <Button
                                variant={isActivePage(page.link).variant}
                                color={isActivePage(page.link).color}
                                href={page.link}
                                onClick={() => onClose(false)}
                                component={Link}
                                startDecorator={page.icon}
                                sx={{
                                  whiteSpace: "nowrap",
                                  justifyContent: "flex-start",
                                  width: "100%",
                                }}
                              >
                                {page.name}
                              </Button>
                            </Unavailable>
                          );
                        } else {
                          return (
                            <Button
                              variant={isActivePage(page.link).variant}
                              color={isActivePage(page.link).color}
                              key={`${page.name}-${page.link}-${index}`}
                              href={page.link}
                              onClick={() => onClose(false)}
                              component={Link}
                              startDecorator={page.icon}
                              sx={{
                                whiteSpace: "nowrap",
                                justifyContent: "flex-start",
                              }}
                            >
                              {page.name}
                            </Button>
                          );
                        }
                      } else {
                        return (
                          <Button
                            variant={isActivePage(page.link).variant}
                            color={isActivePage(page.link).color}
                            key={`${page.name}-${page.link}-${index}`}
                            href={page.link}
                            onClick={() => onClose(false)}
                            component={Link}
                            startDecorator={page.icon}
                            sx={{
                              whiteSpace: "nowrap",
                              justifyContent: "flex-start",
                            }}
                          >
                            {page.name}
                          </Button>
                        );
                      }
                    })}
                  </Stack>
                </Stack>
              );
            }
          })}
        </Stack>
      </Sheet>
    </Drawer>
  );
};
