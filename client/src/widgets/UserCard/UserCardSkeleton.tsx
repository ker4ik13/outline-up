"use client";

import {
  AspectRatio,
  Avatar,
  Card,
  Skeleton,
  Stack,
  Typography,
} from "@mui/joy";
import { BsClockHistory } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";

export const UserCardSkeleton = () => {
  return (
    <Card>
      <Stack
        direction="row"
        spacing={3}
        sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
      >
        <Stack direction="column" spacing={1}>
          <AspectRatio
            ratio="1"
            maxHeight={120}
            sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
          >
            <Skeleton>
              <Avatar
                sx={{ width: 120, height: 120, fontSize: "3rem" }}
                variant="soft"
              >
                П
              </Avatar>
            </Skeleton>
          </AspectRatio>
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <Typography level="h3">
              <Skeleton>Иван Иванов</Skeleton>
            </Typography>
            <Typography level="h3">
              <Skeleton>Никнейм</Skeleton>
            </Typography>
          </Stack>
          <Typography>
            <Skeleton>email@email.com</Skeleton>
          </Typography>
          <Typography>
            <Skeleton>Job title</Skeleton>
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography startDecorator={<FaPencil />}>
          <Skeleton>
            Maybe long status, maybe long status, maybe long status
          </Skeleton>
        </Typography>
      </Stack>
      <Stack direction="column" gap={1} flexWrap="wrap">
        <Stack direction="row">
          <Typography startDecorator={<BsClockHistory />}>
            <Typography>
              <Skeleton>Последнее обновление: 12.12.2022</Skeleton>
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
