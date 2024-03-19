import { IconType } from "@/shared/types/ui";

export const ArrowIcon = ({ className }: IconType) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 1H16M16 1V15.1176M16 1L1 16"
        stroke="#000029"
        strokeWidth="2"
      />
    </svg>
  );
};
