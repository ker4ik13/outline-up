export class PageOptionsDto {
  order: "ASC" | "DESC" = "DESC";
  page: number = 1;
  take: number = 10;
  search?: string;

  constructor(data: Partial<PageOptionsDto>) {
    Object.assign(this, data);
  }

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
