import type { IconType } from "@/shared/types/ui";

export const ArrowRoundedIcon = ({ className, color }: IconType) => {
  return (
    <svg
      viewBox="0 0 18 14"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      stroke="inherit"
    >
      <path
        d="M1 7H17M17 7L11 1M17 7L11 13"
        stroke={color === "dark" ? "#462847" : "#ffffff"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
