'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Button, ButtonProps, buttonVariants } from '@/shared/ui/button';

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination = ({
  className,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  siblingCount = 1,
  ...props
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
    return [];
  }, [totalPages, currentPage, siblingCount]);

  if (currentPage === 0 || totalPages < 2) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    >
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <PaginationLink
            aria-label="Go to previous page"
            size="small"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </PaginationLink>
        </li>
        {paginationRange?.map((pageNumber, index) =>
          typeof pageNumber === 'number' ? (
            <li key={`page-${pageNumber}`}>
              <PaginationLink
                isActive={currentPage === pageNumber}
                size="small"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </li>
          ) : (
            <li key={`dots-${index}`}>
              <PaginationEllipsis />
            </li>
          )
        )}
        <li>
          <PaginationLink
            aria-label="Go to next page"
            size="small"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
};
Pagination.displayName = 'Pagination';

interface PaginationLinkProps extends ButtonProps {
  isActive?: boolean;
}

const PaginationLink = ({ className, isActive, size, ...props }: PaginationLinkProps) => (
  <Button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'primary' : 'ghost',
        size,
      }),
      'gap-1 rounded-full',
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

export { Pagination, PaginationLink, PaginationEllipsis };
