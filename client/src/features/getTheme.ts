export const getTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme");
  if (isDarkTheme && JSON.parse(isDarkTheme) === true) {
    document.body.classList.add("dark");
    return true;
  } else {
    document.body.classList.remove("dark");
    return false;
  }
};
