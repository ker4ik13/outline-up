import { RoleService, UserService } from "@/services/admin";
import { appLinks } from "@/shared/constants";
import { ChangeUserDto } from "@/shared/dtos/user";
import { useAuth } from "@/shared/helpers/auth";
import { useDebouncedCallback, useUpload } from "@/shared/helpers/hooks";
import type { IsValid } from "@/shared/types";
import type { Role } from "@/shared/types/role";
import type { ChangeUser, User } from "@/shared/types/user";
import {
  Check,
  Close,
  EditRounded,
  EmailRounded,
  RemoveCircleOutline,
} from "@mui/icons-material";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaToolbox, FaUserAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";

interface PersonalInfo {
  user: User;
}

export const PersonalInfo = ({ user }: PersonalInfo) => {
  const { updateUser, isLoading, updateUserPhoto } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isValidUsername, setIsValidUsername] = useState(true);

  const getRoles = async () => {
    const response = await RoleService.getRoles();

    if (response.status === 200) {
      setRoles(response.data);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const {
    register,
    formState: { isDirty, isValid, errors, dirtyFields },
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<ChangeUser>();

  const { file, onChangeHandler, removeFile } = useUpload();

  const onPhotoChange = async (event: any) => {
    onChangeHandler(event);

    if (event.target.files[0]) {
      const photoForm = new FormData();
      photoForm.append("photo", event.target.files[0]);
      await updateUserPhoto(photoForm);
    }
  };

  const submit = async (newUser: ChangeUser) => {
    if (!isDirty || !isValid) {
      return;
    }

    const updatedUser = new ChangeUserDto({
      ...user,
      ...newUser,
      updatedAt: new Date().toISOString(),
    });

    delete updatedUser.info.photo;

    console.log(updatedUser);

    if (isDirty && isValid) {
      await updateUser(updatedUser);
    }
  };

  const checkUsername = async (username: string) => {
    if (!username || user.info?.userName === username) {
      clearErrors("info.userName");
      setIsValidUsername(true);
      return;
    }

    try {
      await UserService.checkUsername(username);
      clearErrors("info.userName");
      setIsValidUsername(true);
      return;
    } catch (error) {
      const axiosError = error as AxiosError<IsValid>;
      setError("info.userName", {
        message: axiosError.response?.data.message || axiosError.message,
      });
      setIsValidUsername(false);
      return;
    }
  };
  const debounceCheckUsername = useDebouncedCallback(checkUsername, 500);

  const checkEmail = async (email: string) => {
    if (email === user.email || !email) {
      clearErrors("email");
      return;
    }

    try {
      await UserService.checkEmail(email);
      clearErrors("email");
      return;
    } catch (error) {
      const axiosError = error as AxiosError<IsValid>;
      setError("email", {
        message: axiosError.response?.data.message || axiosError.message,
      });
      return;
    }
  };
  const debounceCheckEmail = useDebouncedCallback(checkEmail, 500);

  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">Персональная информация</Typography>
        <Typography level="body-sm">
          Здесь ты можешь персонализировать свой профиль и изменить информацию о
          себе.
        </Typography>
      </Box>
      <Divider />
      <Stack direction="row" gap={3} my={1} flexWrap="wrap">
        <Stack direction="column" spacing={1}>
          <AspectRatio
            ratio="1"
            maxHeight={120}
            sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
          >
            {!file ? (
              user.info.photo ? (
                <Image
                  src={user.info.photo}
                  alt={user.info.firstName}
                  width={120}
                  height={120}
                />
              ) : (
                <Avatar
                  sx={{ width: 120, height: 120, fontSize: "3rem" }}
                  variant="soft"
                >
                  {user.info.firstName[0]}
                </Avatar>
              )
            ) : (
              <Avatar
                sx={{ width: 120, height: 120, fontSize: "3rem" }}
                variant="soft"
                src={URL.createObjectURL(file)}
              >
                {user.info.firstName[0]}
              </Avatar>
            )}
          </AspectRatio>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            name="photo"
            id="photo"
            onChange={onPhotoChange}
          />
          {file ? (
            <IconButton
              aria-label="Удалить фото"
              size="sm"
              variant="outlined"
              color="neutral"
              onClick={removeFile}
              sx={{
                bgcolor: "background.body",
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                left: 100,
                top: 170,
                boxShadow: "sm",
              }}
            >
              <RemoveCircleOutline />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Загрузить новое фото"
              size="sm"
              variant="outlined"
              color="neutral"
              component="label"
              htmlFor="photo"
              sx={{
                bgcolor: "background.body",
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                left: 100,
                top: 170,
                boxShadow: "sm",
              }}
            >
              <EditRounded />
            </IconButton>
          )}
        </Stack>
        <Stack gap={2}>
          <Stack
            gap={1}
            direction="row"
            alignItems="flex-start"
            flexGrow={1}
            flexWrap="wrap"
          >
            <FormControl error={!!errors.info?.firstName}>
              <FormLabel>Имя</FormLabel>
              <Input
                size="sm"
                type="text"
                autoComplete="given-name"
                placeholder="Иван"
                defaultValue={user.info.firstName}
                startDecorator={<FaUserAlt />}
                sx={{
                  flexGrow: 1,
                }}
                {...register("info.firstName", {
                  required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                  },
                  minLength: {
                    value: 2,
                    message: "Минимальная длина 2 символа",
                  },
                })}
              />
              {errors.info?.firstName && (
                <FormHelperText>{errors.info.firstName.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.info?.lastName}>
              <FormLabel>Фамилия</FormLabel>
              <Input
                size="sm"
                type="text"
                autoComplete="family-name"
                placeholder="Иванов"
                defaultValue={user.info.lastName}
                startDecorator={<FaUserAlt />}
                sx={{
                  flexGrow: 1,
                }}
                {...register("info.lastName", {
                  minLength: {
                    value: 2,
                    message: "Минимальная длина 2 символа",
                  },
                  required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                  },
                })}
              />
              {errors.info?.lastName && (
                <FormHelperText>{errors.info.lastName.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.info?.userName}>
              <FormLabel>Никнейм</FormLabel>
              <Input
                color={
                  dirtyFields.info?.userName
                    ? isValidUsername
                      ? "success"
                      : "danger"
                    : "neutral"
                }
                size="sm"
                type="text"
                placeholder="zxcghoul"
                defaultValue={user.info.userName}
                endDecorator={isValidUsername ? <Check /> : <Close />}
                sx={{
                  flexGrow: 1,
                }}
                {...register("info.userName", {
                  onChange: (event) =>
                    debounceCheckUsername(event.target.value),
                })}
              />
              {errors.info?.userName && (
                <FormHelperText>{errors.info.userName.message}</FormHelperText>
              )}
            </FormControl>
          </Stack>
          <Stack direction="row" gap={1} flexWrap="wrap">
            <FormControl>
              <FormLabel>Должность</FormLabel>
              <Input
                size="sm"
                type="text"
                autoComplete="job-title"
                placeholder="Frontend Developer"
                defaultValue={user.info.job?.position}
                startDecorator={<FaToolbox />}
                {...register("info.job.position", {
                  minLength: 2,
                })}
              />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }} error={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRounded />}
                placeholder="youremail@mail.ru"
                defaultValue={user.email}
                sx={{ flexGrow: 1 }}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email обязателен",
                  },
                  minLength: 2,
                  onChange: (event) => debounceCheckEmail(event.target.value),
                })}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
      <Stack maxWidth={400} gap={1}>
        <FormControl>
          <FormLabel>
            <Typography>{<FaPencil />} Статус</Typography>
          </FormLabel>
          <Textarea
            size="sm"
            placeholder="Думаю о вечном..."
            defaultValue={user.info.status}
            sx={{
              minHeight: 100,
            }}
            {...register("info.status")}
          />
        </FormControl>
        <FormControl error={!!errors.roles}>
          <FormLabel>Роли</FormLabel>
          <Select
            multiple
            startDecorator={<GoWorkflow />}
            endDecorator={
              roles && (
                <Chip size="sm" color="success" variant="soft">
                  +{roles.length}
                </Chip>
              )
            }
            required
            variant="outlined"
            defaultValue={user.roles}
            renderValue={(selected) => {
              const roles = selected.map((value) => value.value);
              setValue("roles", roles);

              return (
                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                  {selected.map((selectedOption, index) => (
                    <Chip variant="soft" color="primary" key={index}>
                      {selectedOption.label}
                    </Chip>
                  ))}
                </Box>
              );
            }}
          >
            {roles &&
              roles.map((role) => (
                <Option value={role.value} key={role._id}>
                  {role.value}
                </Option>
              ))}
          </Select>
        </FormControl>
      </Stack>
      <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            component="a"
            href={appLinks.admin.profile.me}
          >
            Отменить
          </Button>
          <Button
            size="sm"
            variant="solid"
            onClick={handleSubmit(submit)}
            disabled={!isDirty || !isValid || !isValidUsername}
            loading={isLoading}
          >
            Сохранить
          </Button>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};
