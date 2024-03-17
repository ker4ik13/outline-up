import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormControl,
  Input,
  Skeleton,
  Stack,
  Typography,
} from "@mui/joy";

export const PersonalInfoSkeleton = () => {
  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">
          <Skeleton>Персональная информация</Skeleton>
        </Typography>
        <Typography level="body-sm">
          <Skeleton>
            Здесь ты можешь персонализировать свой профиль и изменить информацию
            о себе.
          </Skeleton>
        </Typography>
      </Box>
      <Divider />
      <Stack
        direction="row"
        spacing={3}
        sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
      >
        <AspectRatio
          ratio="1"
          sx={{ borderRadius: "100%", width: 120, height: 120 }}
        >
          <Skeleton />
        </AspectRatio>

        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Stack spacing={1} direction="row" alignItems="center">
            <FormControl>
              <Typography>
                <Skeleton>Имя</Skeleton>
              </Typography>
              <Skeleton variant="rectangular">
                <Input size="sm" />
              </Skeleton>
            </FormControl>
            <FormControl>
              <Typography>
                <Skeleton>Должность</Skeleton>
              </Typography>
              <Skeleton variant="rectangular">
                <Input size="sm" />
              </Skeleton>
            </FormControl>
            <FormControl>
              <Typography>
                <Skeleton>Никнейм</Skeleton>
              </Typography>
              <Skeleton variant="rectangular">
                <Input size="sm" />
              </Skeleton>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormControl>
              <Typography>
                <Skeleton>Должность</Skeleton>
              </Typography>
              <Skeleton variant="rectangular">
                <Input size="sm" />
              </Skeleton>
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <Typography>
                <Skeleton>Email</Skeleton>
              </Typography>
              <Skeleton variant="rectangular">
                <Input size="sm" />
              </Skeleton>
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
      <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          <Skeleton variant="rectangular">
            <Button size="sm" variant="outlined" color="neutral">
              Отменить
            </Button>
          </Skeleton>
          <Skeleton variant="rectangular">
            <Button size="sm" variant="outlined" color="neutral">
              Отменить
            </Button>
          </Skeleton>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};
