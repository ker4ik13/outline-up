export const closeModalOnEscape = (
  event: KeyboardEvent,
  setIsOpen: (value: boolean) => void,
  overflowClass = "overflow"
) => {
  if (event.key === "Escape") {
    setIsOpen(false);
    document.body.classList.remove(overflowClass);
  }
};
