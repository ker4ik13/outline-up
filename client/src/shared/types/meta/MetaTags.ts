import type { SiteType } from "./SiteType";

export interface MetaTags {
  id: number;
  attributes: {
    title: string;
    description?: string;
    keywords?: string;
    path: string;
    type?: SiteType;
    note?: string;
    createdAt: string;
    updatedAt?: string;
    image?: unknown;
  };
}
