import { KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Link as JoyLink } from "@mui/joy";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { appLinks } from "../constants";

interface BreadCrumbsProps {
  pages: {
    label: string;
    link: string;
  }[];
}

export const CustomBreadcrumbs = ({ pages }: BreadCrumbsProps) => {
  return (
    <Breadcrumbs separator={<KeyboardArrowRight />} size="sm">
      <JoyLink color="neutral" href={appLinks.admin.dashboard} component={Link}>
        <IoHome />
      </JoyLink>
      {pages.map((page, index) => (
        <JoyLink
          key={index}
          href={page.link}
          component={Link}
          color={index === pages.length - 1 ? "primary" : "neutral"}
        >
          {page.label}
        </JoyLink>
      ))}
    </Breadcrumbs>
  );
};
