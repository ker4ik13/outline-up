import type { Accordion as IAccordion } from "@/shared/types/ui";
import { ArrowIcon } from "../icons";
import styles from "./Accordion.module.scss";

interface Props extends IAccordion {
  isOpen?: boolean;
  toggleAccordion: () => void;
}

export const Accordion = ({
  content,
  title,
  isOpen,
  toggleAccordion,
}: Props) => {
  if (typeof window !== "undefined" && window.innerWidth > 768) {
    return (
      <div className={styles.accordion} onMouseEnter={toggleAccordion}>
        <div className={styles.upper}>
          <p className={styles.title}>{title}</p>
          <ArrowIcon className={`${styles.arrow} ${isOpen && styles.open}`} />
        </div>

        <div className={`${styles.content} ${isOpen && styles.open}`}>
          {content}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.accordion} onClick={toggleAccordion}>
        <div className={styles.upper}>
          <p className={styles.title}>{title}</p>
          <ArrowIcon className={`${styles.arrow} ${isOpen && styles.open}`} />
        </div>

        <div className={`${styles.content} ${isOpen && styles.open}`}>
          {content}
        </div>
      </div>
    );
  }
};
