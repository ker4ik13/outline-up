export const getTheme = (key = "darkTheme", darkClass = "dark") => {
  const isDarkTheme = localStorage.getItem(key);
  if (isDarkTheme && JSON.parse(isDarkTheme) === true) {
    document.body.classList.add(darkClass);
    return true;
  } else {
    document.body.classList.remove(darkClass);
    return false;
  }
};
