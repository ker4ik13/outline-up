import { PageDto } from "./page.dto";
import type { PageOptionsDto } from "./page.options.dto";

export const generateMetaPage = <T>(
  result: T[],
  itemsArray: T[],
  options: PageOptionsDto
): PageDto<T> => {
  return new PageDto<T>(result, {
    itemCount: itemsArray.length,
    hasNextPage: options.skip + options.take < itemsArray.length,
    hasPreviousPage: options.skip > 0,
    page: options.page,
    pageCount: Math.ceil(itemsArray.length / options.take),
    take: options.take,
  });
};
