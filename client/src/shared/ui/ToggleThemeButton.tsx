import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import { useColorScheme } from "@mui/joy/styles";
import * as React from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { useToggleTheme } from "../helpers/hooks/useToggleTheme";

export const ToggleThemeButton = (props: IconButtonProps) => {
  const { onClick, sx, ...other } = props;
  const { mode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  const { toggleTheme } = useToggleTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={(event) => {
        toggleTheme();
        onClick?.(event);
      }}
      sx={[
        {
          "& > *:first-of-type": {
            display: mode === "dark" ? "none" : "initial",
          },
          "& > *:last-of-type": {
            display: mode === "light" ? "none" : "initial",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <IoSunnyOutline />
      <IoSunnyOutline />
    </IconButton>
  );
};
