export interface IPage {
  link: string;
  title: string;
  description: string;
  keywords?: string;
  createdAt: string;
  updatedAt?: string;
  authors?: null | Author | Array<Author>;
  canonical?: string;
  openGraph?: {
    type?: string;
    title?: string;
    description?: string;
    images?: OGImage | Array<OGImage>;
    siteName?: string;
    url?: string | URL;
  };
  verification?: Verification;
}

// Типы для Metadata
export interface Author {
  url?: string | URL;
  name?: string;
}
export type OGImage = string | OGImageDescriptor | URL;
export type OGImageDescriptor = {
  url: string | URL;
  secureUrl?: string | URL;
  alt?: string;
  type?: string;
  width?: string | number;
  height?: string | number;
};
export type Verification = {
  google?: null | string | number | (string | number)[];
  yahoo?: null | string | number | (string | number)[];
  yandex?: null | string | number | (string | number)[];
  me?: null | string | number | (string | number)[];
  other?: {
    [name: string]: string | number | (string | number)[];
  };
};
