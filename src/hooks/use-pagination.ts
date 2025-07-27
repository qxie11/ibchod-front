import { useMemo, useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
}

export const usePagination = ({ initialPage = 1 }: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const skip = useMemo(() => (currentPage - 1) * 10, [currentPage]);

  return { currentPage, onPageChange, skip };
};
