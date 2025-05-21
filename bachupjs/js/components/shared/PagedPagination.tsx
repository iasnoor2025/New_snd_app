import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PagedPaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  maxPageButtons?: number;
  className?: string;
  showTotal?: boolean;
}

/**
 * A pagination component with page numbers and next/previous buttons
 *
 * @example
 * <PagedPagination
 *   currentPage={customers.current_page}
 *   lastPage={customers.last_page}
 *   totalItems={customers.total}
 *   onPageChange={(page) => handlePageChange(page)}
 *   maxPageButtons={5}
 *   showTotal={true}
 * />
 */
export default function PagedPagination({
  currentPage,
  lastPage,
  onPageChange,
  totalItems,
  maxPageButtons = 5,
  className,
  showTotal = true,
}: PagedPaginationProps) {
  if (lastPage <= 1) {
    return null;
  }

  // Determine which page buttons to show
  const pageButtons: (number | 'ellipsis')[] = [];

  if (lastPage <= maxPageButtons) {
    // Show all pages if there are fewer than maxPageButtons
    for (let i = 1; i <= lastPage; i++) {
      pageButtons.push(i);
    }
  } else {
    // Always show first page
    pageButtons.push(1);

    // Calculate start and end of the middle section
    let startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(lastPage - 1, startPage + maxPageButtons - 3);

    // Adjust if we're near the end
    if (endPage >= lastPage - 1) {
      endPage = lastPage - 1;
      startPage = Math.max(2, endPage - (maxPageButtons - 3));
    }

    // Add ellipsis if needed at the beginning
    if (startPage > 2) {
      pageButtons.push('ellipsis');
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(i);
    }

    // Add ellipsis if needed at the end
    if (endPage < lastPage - 1) {
      pageButtons.push('ellipsis');
    }

    // Always show last page
    pageButtons.push(lastPage);
  }

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between py-3 px-4 border-t bg-white/80 ${className || ''}`}>
      {showTotal && totalItems !== undefined && (
        <div className="text-sm text-muted-foreground">
          Showing {currentPage === 1 ? 1 : ((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalItems)} of {totalItems} results
        </div>
      )}

      <Pagination className="ml-auto">
        <PaginationContent className="gap-1">
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                }}
                className="gap-1 hover:bg-gray-50"
                size="sm"
                aria-label="Go to previous page"
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </PaginationPrevious>
            ) : (
              <PaginationPrevious
                href="#"
                className="pointer-events-none opacity-50 gap-1"
                size="sm"
                aria-label="Go to previous page"
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </PaginationPrevious>
            )}
          </PaginationItem>

          <div className="hidden sm:flex gap-1">
            {pageButtons.map((page, index) =>
              page === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page);
                    }}
                    isActive={currentPage === page}
                    size="sm"
                    className={currentPage === page ? "bg-primary hover:bg-primary text-primary-foreground font-medium" : "hover:bg-gray-50"}
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
          </div>

          <div className="sm:hidden flex items-center gap-1">
            <span className="text-sm">Page {currentPage} of {lastPage}</span>
          </div>

          <PaginationItem>
            {currentPage < lastPage ? (
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage + 1);
                }}
                className="gap-1 hover:bg-gray-50"
                size="sm"
                aria-label="Go to next page"
                <span className="sr-only">Next</span>
                <ChevronRight className="h-4 w-4" />
              </PaginationNext>
            ) : (
              <PaginationNext
                href="#"
                className="pointer-events-none opacity-50 gap-1"
                size="sm"
                aria-label="Go to next page"
                <span className="sr-only">Next</span>
                <ChevronRight className="h-4 w-4" />
              </PaginationNext>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
