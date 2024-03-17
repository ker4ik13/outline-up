"use client";

import { ArticlesService } from "@/services/admin";
import { SITE_NAME } from "@/shared/constants";
import { Texter, humanFileSize } from "@/shared/helpers";
import { createArticleForm } from "@/shared/helpers/forms";
import { useUpload } from "@/shared/helpers/hooks";
import type { CreateArticleDto } from "@/shared/types/article";
import {
  ArticleOutlined,
  Create,
  DateRange,
  Link,
  Tag,
  Title,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardOverflow,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { useEditor } from "@tiptap/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DropZone } from "../DropZone";
import { FileUpload } from "../FileUpload";
import { TextEditor } from "../TextEditor/TextEditor";
import { defaultEditorExtensions } from "../TextEditor/defaultEditorExtensions";
import s from "./NewArticle.module.scss";

export const NewArticle = () => {
  const {
    file,
    fileName,
    isDrag,
    onChangeHandler,
    onDragLeaveHandler,
    onDragStartHandler,
    onDropHandler,
    removeFile,
  } = useUpload();
  const {
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
    resetField,
    clearErrors,
  } = useForm<CreateArticleDto>({
    defaultValues: {
      status: "draft",
    },
  });

  const editor = useEditor({
    extensions: defaultEditorExtensions,
    content: "<p>Контент для статьи</p>",
  });

  const [isEmptyTitle, setIsEmptyTitle] = useState(true);

  if (!editor) {
    return null;
  }

  const submit = async (newArticle: CreateArticleDto) => {
    try {
      const form = createArticleForm(newArticle, editor, file);
      await ArticlesService.addArticle(form);

      editor?.commands.clearContent();
      clearErrors("root");
      resetField("title");
      resetField("content");
      resetField("slug");
      resetField("meta.title");
      resetField("meta.description");
      resetField("meta.keywords");
      resetField("tags");
      resetField("preview");
      resetField("status");
      resetField("description");
      resetField("publishedAt");
      removeFile();
    } catch (error) {
      setError("root", {
        message: "Произошла ошибка при создании статьи",
        type: "server",
      });
    }
  };

  const generateMetaTitle = () => {
    const title = getValues("title");

    if (title) {
      setValue("meta.title", `${title} | ${SITE_NAME}`);
      clearErrors("meta.title");
      return;
    } else {
      setError("meta.title", {
        message: "Заполните название статьи",
        type: "required",
      });
      return;
    }
  };

  const generateSlug = () => {
    const title = getValues("title");

    if (title) {
      const slug = Texter.slugify(title);
      setValue("slug", slug);
      clearErrors("slug");
      return;
    } else {
      setError("slug", {
        message: "Заполните название статьи",
        type: "required",
      });
      return;
    }
  };

  // const validateDate = (date: string) => {
  //   const pickedDate = new Date(date);
  //   const nowDate = new Date();

  //   if (pickedDate < nowDate) {
  //     setError("publishedAt", {
  //       message: "Дата публикации не может быть в прошлом",
  //       type: "validate",
  //     });
  //     return;
  //   } else {
  //     clearErrors("publishedAt");
  //   }
  // };

  return (
    <Card sx={{ mt: 1 }} color={errors.root ? "danger" : "neutral"}>
      <Stack gap={3} direction="row" alignItems="center">
        <Typography level="title-md">Написать новую статью</Typography>
        {errors.root && (
          <FormControl error={!!errors.root}>
            <FormHelperText>{errors.root.message}</FormHelperText>
          </FormControl>
        )}
      </Stack>
      <Divider />
      <Stack direction="column" spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="flex-start"
          justifyContent="center"
        >
          {file && (
            <div className={s.imageWrapper}>
              <Image
                src={URL.createObjectURL(file)}
                alt={fileName}
                draggable={false}
                width={200}
                height={400}
                className={s.image}
              />
              <p className={s.fileName}>{fileName}</p>
            </div>
          )}
          {!file && (
            <DropZone
              onChange={onChangeHandler}
              onDragLeave={onDragLeaveHandler}
              onDragStart={onDragStartHandler}
              onDragOver={onDragStartHandler}
              onDrop={onDropHandler}
              isDrag={isDrag}
            />
          )}
          {file && (
            <FileUpload
              removeFile={removeFile}
              fileName={fileName}
              fileSize={file ? `${humanFileSize(file.size)}` : "0kb"}
              progress={file ? 100 : 0}
              sx={{
                minWidth: 320,
                flexGrow: 1,
              }}
            />
          )}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <FormControl
            error={!!errors.title}
            sx={{
              flexGrow: 3,
            }}
          >
            <FormLabel>Название</FormLabel>
            <Input
              size="sm"
              required
              startDecorator={<Title />}
              placeholder="Статья про Frontend"
              {...register("title", {
                required: "Заполните название статьи",
              })}
              onChange={(event) =>
                event.target.value
                  ? setIsEmptyTitle(false)
                  : setIsEmptyTitle(true)
              }
            />
            {errors.title && (
              <FormHelperText>{errors.title.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.slug} sx={{ flexGrow: 1 }}>
            <FormLabel>Slug / ссылка</FormLabel>
            <Input
              size="sm"
              required
              startDecorator={<Link />}
              endDecorator={
                <Button
                  size="sm"
                  disabled={isEmptyTitle}
                  onClick={generateSlug}
                >
                  <Create />
                </Button>
              }
              placeholder="article-about-frontend"
              sx={{ flexGrow: 1 }}
              {...register("slug", {
                required: "Заполните ссылку статьи",
              })}
            />
            {errors.slug && (
              <FormHelperText>{errors.slug.message}</FormHelperText>
            )}
          </FormControl>
        </Stack>
        <FormControl error={!!errors.publishedAt}>
          <FormLabel>Дата публикации</FormLabel>
          <Input
            size="sm"
            type="datetime-local"
            startDecorator={<DateRange />}
            sx={{ flexGrow: 1 }}
            {...register("publishedAt")}
          />
          {errors.publishedAt && (
            <FormHelperText>{errors.publishedAt.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={!!errors.description}>
          <FormLabel>Описание</FormLabel>
          <Textarea
            placeholder="Описание статьи"
            {...register("description", {
              required: "Заполните описание статьи",
            })}
          />
          {errors.description && (
            <FormHelperText>{errors.description.message}</FormHelperText>
          )}
        </FormControl>
      </Stack>
      <Divider>
        <Chip variant="outlined" size="md">
          Meta information
        </Chip>
      </Divider>
      <FormControl error={!!errors.meta?.title}>
        <FormLabel>Мета заголовок</FormLabel>
        <Input
          size="sm"
          startDecorator={<Title />}
          placeholder={`Статья про Frontend | ${SITE_NAME}`}
          endDecorator={
            <Button
              disabled={isEmptyTitle}
              size="sm"
              onClick={generateMetaTitle}
            >
              <Create />
            </Button>
          }
          sx={{ flexGrow: 1 }}
          {...register("meta.title", {
            required: true,
          })}
        />
        {errors.meta?.title && (
          <FormHelperText>{errors.meta.title.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl error={!!errors.meta?.description}>
        <FormLabel>Мета описание</FormLabel>
        <Textarea
          size="sm"
          placeholder={`В этой статье рассказывается про современный Frontend...`}
          sx={{ flexGrow: 1 }}
          {...register("meta.description")}
        />
        {errors.meta?.description && (
          <FormHelperText>{errors.meta?.description.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl error={!!errors.meta?.keywords}>
        <FormLabel>Ключевые слова</FormLabel>
        <Textarea
          size="sm"
          placeholder={`Ключевое слово, ключевое слово, ключевое слово`}
          sx={{ flexGrow: 1 }}
          {...register("meta.keywords")}
        />
        {errors.meta?.keywords && (
          <FormHelperText>{errors.meta?.keywords.message}</FormHelperText>
        )}
      </FormControl>
      <Stack
        direction="row"
        alignItems="flex-start"
        spacing={1}
        sx={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <FormControl
          error={!!errors.tags}
          sx={{
            flexGrow: 4,
          }}
        >
          <FormLabel>Теги</FormLabel>
          <Input
            size="sm"
            startDecorator={<Tag />}
            placeholder={`Frontend, Web, Programming`}
            {...register("tags")}
          />
          {errors.tags && (
            <FormHelperText>{errors.tags.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          error={!!errors.status}
          sx={{ flexGrow: 1 }}
          {...register("status", {
            required: "Заполните статус статьи",
          })}
        >
          <FormLabel>Статус</FormLabel>
          <Select
            size="sm"
            startDecorator={<ArticleOutlined />}
            variant="outlined"
            required
            name="status"
            defaultValue={"draft"}
          >
            <Option defaultChecked value={"draft"}>
              Черновик
            </Option>
            <Option value={"published"}>Опубликовано</Option>
          </Select>
          {errors.status && (
            <FormHelperText>{errors.status.message}</FormHelperText>
          )}
        </FormControl>
      </Stack>
      <TextEditor editor={editor} />
      <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          <Button size="sm" variant="outlined" color="neutral">
            Отменить
          </Button>
          <Button
            size="sm"
            variant="solid"
            onClick={handleSubmit(submit)}
            disabled={!isValid}
            // loading={isLoading}
          >
            Сохранить
          </Button>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};
