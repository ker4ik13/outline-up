"use client";

import s from "@/pages/GeneralPage.module.scss";
import { appLinks } from "@/shared/constants";
import { CustomBreadcrumbs, Empty } from "@/shared/ui";
import {
  Button,
  Card,
  CardActions,
  CardOverflow,
  FormControl,
  FormHelperText,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoQrCodeOutline } from "react-icons/io5";

interface CreateQrCodeDto {
  url: string;
}

const CreateQrPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<CreateQrCodeDto>();

  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const createQrCode = (values: CreateQrCodeDto) => {
    const urlRegex = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    ).test(values.url);

    if (!urlRegex) {
      setError("url", {
        message: "Некорректная ссылка",
        type: "validate",
      });
      setQrCodeUrl("");
      return;
    }

    clearErrors("url");
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${values.url}`;
    setQrCodeUrl(qrCodeUrl);
    console.log(values.url);
  };

  return (
    <div className={s.page}>
      <CustomBreadcrumbs
        pages={[
          { label: "Инструменты", link: appLinks.admin.tools.main },
          { label: "Создать QR-Code", link: appLinks.admin.tools.qr },
        ]}
      />
      <h2 className={s.title}>Создать QR-Code</h2>
      <Stack direction="row" gap={3} mt={3} width="100%">
        <Card
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography level="body-md" fontWeight="600">
            Создать QR-Code
          </Typography>
          <Stack
            gap={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <FormControl
              error={!!errors.url}
              sx={{
                width: "50%",
              }}
            >
              <Input
                placeholder="https://example.com"
                startDecorator={<IoQrCodeOutline />}
                type="url"
                {...register("url", {
                  required: "Поле обязательно для заполнения",
                })}
              />
              {errors.url && (
                <FormHelperText>{errors.url.message}</FormHelperText>
              )}
            </FormControl>
          </Stack>
          {qrCodeUrl && (
            <Image src={qrCodeUrl} width={100} height={100} alt={qrCodeUrl} />
          )}
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="solid"
                onClick={handleSubmit(createQrCode)}
                // disabled={!isValid}
                // loading={isLoading}
              >
                Создать
              </Button>
              <Button
                size="sm"
                variant="outlined"
                color="primary"
                // onClick={handleSubmit(createQrCode)}
                disabled={!isValid}
                // loading={isLoading}
              >
                Сохранить
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card
          sx={{
            flexGrow: 2,
          }}
        >
          <Typography level="body-md" fontWeight="600">
            Вы можете создать любой QR-Code с ссылкой
          </Typography>
        </Card>
      </Stack>
      <Typography
        level="body-lg"
        fontWeight="600"
        sx={{
          mt: 3,
        }}
      >
        Недавние
      </Typography>
      <Empty title="В разработке" />
    </div>
  );
};

export default CreateQrPage;
