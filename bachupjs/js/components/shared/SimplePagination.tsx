import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface SimplePaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  className?: string;
}

/**
 * A simple pagination component with just previous and next buttons
 *
 * @example
 * <SimplePagination
 *   currentPage={customers.current_page}
 *   lastPage={customers.last_page}
 *   totalItems={customers.total}
 *   onPageChange={(page) => handlePageChange(page)}
 * />
 */
export default function SimplePagination({
  currentPage,
  lastPage,
  onPageChange,
  totalItems,
  className,
}: SimplePaginationProps) {
  if (lastPage <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between px-2 ${className || ''}`}>
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {lastPage}
        {totalItems !== undefined && ` (${totalItems} total)`}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                }}
                size="default"
              />
            ) : (
              <PaginationPrevious
                href="#"
                className="pointer-events-none opacity-50"
                size="default"
              />
            )}
          </PaginationItem>

          <PaginationItem>
            {currentPage < lastPage ? (
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage + 1);
                }}
                size="default"
              />
            ) : (
              <PaginationNext
                href="#"
                className="pointer-events-none opacity-50"
                size="default"
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
