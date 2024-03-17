import type { ColorPaletteProp } from "@mui/joy";

export const getColorFromRole = (role: string): ColorPaletteProp => {
  switch (role) {
    case "Создатель":
      return "danger";
    case "Администратор":
      return "warning";
    default:
      return "primary";
  }
};
