export interface Rate {
  duration: string;
  subtitle: string;
  advantages: string;
  price: number;
  button: {
    text?: string;
    href: string;
  };
  mostProfitable?: boolean;
}
