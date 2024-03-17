import type { User } from "../user";

export type ArticleAuthor = Omit<User, "private" | "blocked" | "notifications">;
