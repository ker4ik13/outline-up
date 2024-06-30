import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import { TextContent as ITextContent } from "@/shared/types/api";
import type { DefaultBlockProps } from "@/shared/types/ui";
import Markdown from "markdown-to-jsx";
import styles from "./TextContent.module.scss";

interface Props extends DefaultBlockProps {
  content: ITextContent;
}

export const TextContent = async ({
  isGrayBg,
  rounded,
  className,
  content,
}: Props) => {
  return (
    <div
      className={`${styles.block} ${getDefaultBlockStyles({
        styles,
        isGrayBg,
        rounded,
        className,
      })}`}
    >
      {!content || !content.attributes ? (
        <div className={styles.container}>
          <div className={styles.content}>
            <p>Ничего не найдено :(</p>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{content.attributes.title}</h1>
            <time
              dateTime={new Date(
                content.attributes.publishDate
              ).toLocaleDateString("ru")}
              className={styles.date}
            >
              {new Date(content.attributes.publishDate).toLocaleDateString(
                "ru"
              )}
            </time>
          </div>
          <div className={styles.content}>
            <Markdown>{content.attributes.content}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};
