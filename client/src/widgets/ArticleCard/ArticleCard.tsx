import { appLinks } from "@/shared/constants";
import { isRoleIncludes } from "@/shared/helpers";
import { useAuth } from "@/shared/helpers/auth";
import { setServerUrlBeforeSrc } from "@/shared/helpers/files";
import type { Article } from "@/shared/types/article";
import { UserRoles } from "@/shared/types/role";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Divider,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
} from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import s from "./ArticleCard.module.scss";

type ArticleCardProps = {
  article: Article;
  openDeleteModal?: (article: Article) => void;
  openToggleModal?: (article: Article) => void;
  withoutDropdown?: boolean;
};

export const ArticleCard = ({
  article,
  openDeleteModal,
  openToggleModal,
  withoutDropdown,
}: ArticleCardProps) => {
  const { user } = useAuth();

  return (
    <Card
      className={s.articleCard}
      sx={{
        padding: 0,
        flexGrow: 1,
      }}
    >
      <Chip
        size="sm"
        color={article.status === "draft" ? "warning" : "success"}
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 2,
          paddingInline: 1,
        }}
      >
        {article.status === "draft" ? "Черновик" : "Опубликован"}
      </Chip>
      {user && !withoutDropdown && (
        <Dropdown>
          <MenuButton
            variant="outlined"
            color="neutral"
            onClick={(e) => e.stopPropagation()}
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              backgroundColor: "var(--joy-palette-background-body)",
            }}
          >
            <BsThreeDotsVertical />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              p: 1,
              gap: 1,
              borderRadius: "lg",
              transition: "background-color 0.3s ease-in-out",
            }}
            variant="outlined"
            color="neutral"
          >
            <ButtonGroup orientation="vertical">
              <MenuItem
                sx={{
                  m: 0,
                  p: 0,
                }}
              >
                <Button
                  color="neutral"
                  size="md"
                  variant="outlined"
                  component={Link}
                  href={appLinks.admin.articles.view(article.slug)}
                  fullWidth
                >
                  Перейти
                </Button>
              </MenuItem>
              {isRoleIncludes(
                [UserRoles.Creator, UserRoles.Editor, UserRoles.Admin],
                user.roles
              ) && (
                <>
                  <MenuItem
                    sx={{
                      m: 0,
                      p: 0,
                    }}
                  >
                    <Button
                      color="primary"
                      size="md"
                      variant="solid"
                      component={Link}
                      href={appLinks.admin.articles.edit(article.slug)}
                      fullWidth
                    >
                      Редактировать
                    </Button>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      m: 0,
                      p: 0,
                    }}
                  >
                    <Button
                      color={article.status === "draft" ? "success" : "warning"}
                      size="md"
                      variant="solid"
                      type="button"
                      onClick={
                        openToggleModal
                          ? () => openToggleModal(article)
                          : undefined
                      }
                      fullWidth
                    >
                      {article.status === "draft"
                        ? "Опубликовать"
                        : "Снять с публикации"}
                    </Button>
                  </MenuItem>
                </>
              )}
            </ButtonGroup>
            {isRoleIncludes(
              [UserRoles.Creator, UserRoles.Editor, UserRoles.Admin],
              user.roles
            ) && (
              <>
                <Divider />
                <MenuItem
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                >
                  <Button
                    color="danger"
                    size="md"
                    variant="solid"
                    component={"button"}
                    type="button"
                    fullWidth
                    onClick={
                      openDeleteModal
                        ? () => openDeleteModal(article)
                        : undefined
                    }
                  >
                    Удалить
                  </Button>
                </MenuItem>
              </>
            )}
          </Menu>
        </Dropdown>
      )}
      <div className={s.imageWrapper}>
        <Image
          src={article.preview}
          width={200}
          height={100}
          alt={article.title}
          className={s.image}
          draggable={false}
        />
        <div className={s.tags}>
          {article.tags?.split(",").map((tag, index) => (
            <p className={s.tag} key={index}>
              {tag}
            </p>
          ))}
        </div>
      </div>
      <Stack
        paddingInline={2}
        paddingBottom={2}
        height="100%"
        justifyContent="space-between"
      >
        <Stack>
          <p className={s.title}>{article.title}</p>
          <p className={s.desc}>{article.description}</p>
        </Stack>
        <Stack justifySelf="flex-end">
          <Divider
            sx={{
              mt: 1.5,
              mb: 1.5,
            }}
          />
          <time dateTime={article.createdAt} className={s.date}>
            {new Date(article.createdAt).toLocaleString("ru")}
          </time>
          {user &&
            isRoleIncludes(
              [UserRoles.Creator, UserRoles.Editor],
              user.roles
            ) && (
              <Card
                sx={{
                  flexDirection: "row",
                  paddingInline: 1,
                  paddingBlock: 1,
                  marginTop: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack gap={1} direction="row">
                  {article.author.info.photo ? (
                    <Avatar
                      src={setServerUrlBeforeSrc(article.author.info.photo)}
                      variant="solid"
                      alt={article.author.info.firstName}
                    />
                  ) : (
                    <Avatar variant="solid" alt={article.author.info.firstName}>
                      {article.author.info.firstName[0] +
                        article.author.info.lastName[0]}
                    </Avatar>
                  )}
                  <Stack gap={1}>
                    <Stack direction="row" gap={0.5}>
                      <p className={s.desc}>{article.author.info.firstName}</p>
                      <p className={s.desc}>{article.author.info.lastName}</p>
                    </Stack>
                    {article.author.info.contactEmail && (
                      <p className={s.desc}>
                        {article.author.info.contactEmail}
                      </p>
                    )}
                  </Stack>
                </Stack>
                <IconButton
                  component={Link}
                  variant="outlined"
                  href={
                    user?._id === article.author._id
                      ? appLinks.admin.profile.me
                      : appLinks.admin.users.view(
                          article.author.info.userName
                            ? article.author.info.userName
                            : article.author._id
                        )
                  }
                >
                  <BsEye />
                </IconButton>
              </Card>
            )}
        </Stack>
      </Stack>
    </Card>
  );
};
