import { Link } from "../Link";

export interface ChangeUserCreator {
  _id: string;
  name: string;
  lastName: string;
  photo?: string;
  status?: string;
  jobTitle?: string;
  links?: Link[];
  about?: string;
  updatedAt: string;
  roles: string[];
  telegramId: number;
  telegramNotifications?: boolean;
  emailNotifications?: boolean;
}
