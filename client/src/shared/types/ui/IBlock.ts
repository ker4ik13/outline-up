import { IComponentProps } from "@/shared/ui/user/blocks";

export interface IBlock<T extends IComponentProps> {
  blockName: string;
  content:
    | string
    | {
        data: T[];
      };
}
