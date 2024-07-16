import type { Accordion } from "./Accordion";

export interface InstructionAccordion {
  id: number;
  attributes: {
    name: string;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
    publishedAt?: string;
    values: Accordion[];
  };
}
