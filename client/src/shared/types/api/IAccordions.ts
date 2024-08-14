import type { Meta } from "../meta";

export interface IAccordions<T> {
  data: {
    id: number;
    attributes: {
      name: string;
      title: string;
      createdAt: string;
      updatedAt?: string;
      values: T[];
      moreText?: string;
    };
  }[];
  meta: Meta;
}

export interface IAccordionsOne<T> {
  data: {
    id: number;
    attributes: {
      name: string;
      title: string;
      createdAt: string;
      updatedAt?: string;
      values: T[];
      moreText?: string;
    };
  };
  meta: Meta;
}
