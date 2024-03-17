import { language, translate } from "@/data/admin/translate";
import { showNotification } from "@/widgets/Notification/utils";
import { useColorScheme } from "@mui/joy";

export const useToggleTheme = () => {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
      showNotification(translate.notification.darkThemeOn[language], {
        type: "success",
        autoClose: 2000,
        theme: "dark",
        hideProgressBar: true,
      });
    } else {
      setMode("light");
      showNotification(translate.notification.lightThemeOn[language], {
        type: "success",
        autoClose: 2000,
        theme: "light",
        hideProgressBar: true,
      });
    }
  };

  return {
    toggleTheme,
  };
};
