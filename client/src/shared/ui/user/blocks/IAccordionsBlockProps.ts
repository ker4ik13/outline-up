import type { IAccordions } from "@/shared/types/api";
import type { Accordion } from "@/shared/types/ui";

export interface IAccordionsBlockProps {
  blockName: string;
  data: IAccordions<Accordion>;
}
