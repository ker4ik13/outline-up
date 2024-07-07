// Интерфейс для изображений со Strapi
export interface StrapiImageData {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText?: string;
      caption?: string;
      width: number;
      height: number;
      url: string;
      size: number;
      mime: string;
      hash: string;
      ext: string;
      previewUrl?: string;
      provider?: string;
      provider_metadata?: string;
      createdAt: string;
      updatedAt?: string;
      formats: {
        large: StrapiImage;
        small: StrapiImage;
        medium: StrapiImage;
        thumbnail: StrapiImage;
      };
    };
  };
}

export interface StrapiImage {
  ext: string; // Расширение файла (.jpeg)
  url: string;
  hash: string;
  mime: string; // Тип файла (image/jpeg)
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
