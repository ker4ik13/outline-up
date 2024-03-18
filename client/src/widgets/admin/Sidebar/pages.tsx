import { language, translate } from "@/data/admin/translate";
import { appLinks } from "@/shared/constants";
import { UserRoles } from "@/shared/types/role";
import { type ReactNode } from "react";
import { FaTools } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import {
  IoDocumentOutline,
  IoMailOutline,
  IoSettings,
  IoWalletOutline,
} from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineArticle,
  MdOutlineFeedback,
  MdOutlineWorkOutline,
} from "react-icons/md";

export interface Page {
  name: string;
  link: string;
  icon: ReactNode;
  pages?: Page[];
  isUnavailable?: boolean;
  needRoles?: string[];
}

export interface GroupPages {
  groupName: string;
  pages: Page[];
  needRoles?: string[];
}

export const pages: GroupPages[] = [
  {
    groupName: "Главное",
    pages: [
      {
        name: translate.sidebar.dashboard[language],
        link: appLinks.admin.dashboard,
        icon: <LuLayoutDashboard />,
      },
      {
        name: translate.sidebar.orders[language],
        link: appLinks.admin.orders,
        icon: <MdOutlineWorkOutline />,
        isUnavailable: true,
        needRoles: [UserRoles.Admin, UserRoles.Creator],
      },
      {
        name: translate.sidebar.users[language],
        link: appLinks.admin.users.main,
        icon: <FaRegUser />,
        needRoles: [UserRoles.Admin, UserRoles.Creator, UserRoles.Editor],
      },
      {
        name: translate.sidebar.articles[language],
        link: appLinks.admin.articles.main,
        icon: <MdOutlineArticle />,
      },
      {
        name: translate.sidebar.wallet[language],
        link: appLinks.admin.wallet,
        icon: <IoWalletOutline />,
        isUnavailable: true,
        needRoles: [UserRoles.Admin, UserRoles.Creator],
      },
    ],
  },
  {
    groupName: "Коммуникация",
    needRoles: [UserRoles.Admin, UserRoles.Creator],
    pages: [
      {
        name: translate.sidebar.responses[language],
        link: appLinks.admin.responses,
        icon: <MdOutlineFeedback />,
        isUnavailable: true,
      },
      {
        name: translate.sidebar.mailings[language],
        link: appLinks.admin.mailings,
        icon: <IoMailOutline />,
        isUnavailable: true,
      },
    ],
  },
  {
    groupName: "Помощь",
    pages: [
      {
        name: translate.sidebar.help[language],
        link: appLinks.admin.help,
        icon: <IoIosHelpCircleOutline />,
      },
      {
        name: translate.sidebar.tools[language],
        link: appLinks.admin.tools.main,
        icon: <FaTools />,
        needRoles: [UserRoles.Admin, UserRoles.Creator, UserRoles.Editor],
      },
      {
        name: translate.header.settings[language],
        link: appLinks.admin.settings,
        icon: <IoSettings />,
      },
    ],
  },
  {
    groupName: "Документация",
    needRoles: [UserRoles.Admin, UserRoles.Creator, UserRoles.Editor],
    pages: [
      {
        name: translate.sidebar.articles[language],
        link: appLinks.admin.documentation.articles,
        icon: <IoDocumentOutline />,
        needRoles: [UserRoles.Admin, UserRoles.Creator, UserRoles.Editor],
      },
      {
        name: translate.sidebar.users[language],
        link: appLinks.admin.documentation.users,
        icon: <IoDocumentOutline />,
        needRoles: [UserRoles.Admin, UserRoles.Creator],
      },
      {
        name: translate.sidebar.mailings[language],
        link: appLinks.admin.documentation.mailings,
        icon: <IoDocumentOutline />,
        needRoles: [UserRoles.Admin, UserRoles.Creator],
      },
      {
        name: translate.sidebar.orders[language],
        link: appLinks.admin.documentation.orders,
        icon: <IoDocumentOutline />,
        needRoles: [UserRoles.Admin, UserRoles.Creator],
      },
    ],
  },
];
