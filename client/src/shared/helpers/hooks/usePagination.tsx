import { PageMetaDto, PageOptionsDto } from "@/shared/dtos/page";
import { Button, IconButton, Stack } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import {
  FaBackward,
  FaForward,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";

export interface UsePagination extends PageMetaDto {
  getItems: (options: PageOptionsDto) => void;
}

const VIEW_PAGES = 5;

export const usePagination = ({
  getItems,
  take,
  page,
  pageCount,
  hasNextPage,
  hasPreviousPage,
}: UsePagination) => {
  const onFirstPageChange = () => {
    return getItems(new PageOptionsDto({ page: 1, take }));
  };
  const onLastPageChange = () => {
    return getItems(new PageOptionsDto({ page: pageCount, take }));
  };
  const onNextPageChange = () => {
    return getItems(new PageOptionsDto({ page: page + 1, take }));
  };
  const onPrevPageChange = () => {
    return getItems(new PageOptionsDto({ page: page - 1, take }));
  };
  const onCustomPageChange = (customPage: number) => {
    return getItems(new PageOptionsDto({ page: customPage, take }));
  };

  const maxPagesToShow = Math.min(pageCount || 1, VIEW_PAGES);
  const startPage = Math.max(
    1,
    Math.min(
      page - Math.floor(VIEW_PAGES / 2),
      (pageCount || 1) - VIEW_PAGES + 1
    )
  );
  const endPage = Math.min(pageCount || 1, startPage + VIEW_PAGES - 1);

  const PaginationButtons = ({ sx }: { sx?: SxProps }) => {
    return (
      <Stack
        justifyContent="center"
        alignItems="stretch"
        direction="row"
        gap={2}
        mt={5}
        sx={sx}
      >
        <IconButton
          disabled={!hasPreviousPage || page - 2 <= 0}
          onClick={onFirstPageChange}
          variant="outlined"
        >
          <FaBackward />
        </IconButton>
        <IconButton
          disabled={!hasPreviousPage}
          onClick={onPrevPageChange}
          variant="outlined"
        >
          <FaStepBackward />
        </IconButton>

        {/* Pagination buttons */}
        {[...new Array(maxPagesToShow)]
          .map((_, index) => (
            <Button
              key={index}
              variant={startPage + index === page ? "solid" : "soft"}
              color={startPage + index === page ? "primary" : "neutral"}
              onClick={() => onCustomPageChange(startPage + index)}
            >
              {startPage + index}
            </Button>
          ))
          .slice(0, endPage - startPage + 1)}

        {/* Last page button */}
        {page + VIEW_PAGES / 2 + 1 < pageCount && page !== pageCount && (
          <Button
            variant={"soft"}
            color={"neutral"}
            onClick={() => onCustomPageChange(pageCount)}
          >
            {pageCount}...
          </Button>
        )}

        <IconButton
          disabled={!hasNextPage}
          onClick={onNextPageChange}
          variant="outlined"
        >
          <FaStepForward />
        </IconButton>

        <IconButton
          disabled={!hasNextPage || page + 1 >= pageCount}
          variant="outlined"
          onClick={onLastPageChange}
        >
          <FaForward />
        </IconButton>
      </Stack>
    );
  };

  return {
    PaginationButtons,
  };
};
