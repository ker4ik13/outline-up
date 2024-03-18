// Вызов меню бургера
export const handleNav = (
  burger: React.RefObject<HTMLDivElement>,
  styles: {
    readonly [key: string]: string;
  }
) => {
  const container: HTMLDivElement | null = document.querySelector(
    `.${styles.container}`
  );
  const pagesWrapper: HTMLDivElement | null = document.querySelector(
    `.${styles.centerPages}`
  );

  burger.current?.classList.toggle(styles.active);
  pagesWrapper?.classList.toggle(styles.active);
  document.body.classList.toggle("overflow");

  const navLinks = document.querySelectorAll(`.${styles.page}`);

  document.body.addEventListener("click", (event) => {
    if (burger.current && event.composedPath().includes(burger.current)) {
      return;
    }
    if (container && !event.composedPath().includes(container)) {
      burger.current?.classList.remove(styles.active);
      document.body.classList.remove("overflow");
      pagesWrapper?.classList.remove(styles.active);
    }
  });

  // Закрытие бургера при клике на любую страницу
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (burger.current) {
        burger.current.classList.remove(styles.active);
        document.body.classList.remove("overflow");
        pagesWrapper?.classList.remove(styles.active);
      }
    });
  });
};
