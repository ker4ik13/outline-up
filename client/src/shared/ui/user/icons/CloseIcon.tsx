import { IconType } from "@/shared/types/ui";

export const CloseIcon = ({ className }: IconType) => {
  return (
    <svg
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11 1L1 11M1 1L11 11"
        stroke="#280A29"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
