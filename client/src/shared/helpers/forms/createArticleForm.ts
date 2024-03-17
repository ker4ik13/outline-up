import type { CreateArticleDto } from "@/shared/types/article";
import type { Editor } from "@tiptap/react";

// Функция для создания формы новой статьи

export const createArticleForm = (
  newArticle: CreateArticleDto,
  editor?: Editor,
  file?: File
): FormData => {
  if (!editor) {
    throw new Error("Editor is not defined");
  }

  const newArticleForm = new FormData();

  // Добавление полей в форму
  // Preview
  if (file) {
    newArticleForm.append("preview", file);
  }

  // Info
  newArticleForm.append("slug", newArticle.slug);
  newArticleForm.append("status", newArticle.status);
  newArticleForm.append("content", editor?.getHTML());
  newArticleForm.append("meta", JSON.stringify(newArticle.meta));
  newArticleForm.append("title", newArticle.title);
  newArticleForm.append("description", newArticle.description);
  if (newArticle.tags) {
    newArticleForm.append("tags", newArticle.tags);
  }

  // Dates
  newArticleForm.append("createdAt", new Date().toISOString());
  if (newArticle.publishedAt) {
    newArticleForm.append(
      "publishedAt",
      new Date(newArticle.publishedAt).toISOString()
    );
  }

  return newArticleForm;
};
