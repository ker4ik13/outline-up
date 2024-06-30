export interface Rate {
  id: number;
  attributes: {
    position: number;
    duration: string;
    subtitle: string;
    advantages: string;
    price: number;
    mostProfitable?: boolean;
    button_text?: string;
    button_href: string;
    createdAt: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}
