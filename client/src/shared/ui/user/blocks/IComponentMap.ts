import { IAccordionsBlockProps } from "./IAccordionsBlockProps";

export interface IComponentMap {
  [key: string]: React.ComponentType<any>;
}
export interface IComponentProps {
  index: number;
  data: IAccordionsBlockProps;
}
