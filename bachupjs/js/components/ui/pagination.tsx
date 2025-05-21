import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  query?: Record<string, string>
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  query = {},
}) => {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  const getPageUrl = (page: number) => {
    // Create query string with page parameter and any additional query parameters
    const queryParams = new URLSearchParams({
      ...query,
      page: page.toString(),
    })

    return `${baseUrl}?${queryParams.toString()}`;
  };

  // Determine which page numbers to show
  const generatePaginationItems = () => {
    const items: (number | 'ellipsis')[] = [];
    
    // Always include first page
    items.push(1);
    
    // Calculate start and end of the displayed page range
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis if there's a gap between first page and startPage
    if (startPage > 2) {
      items.push('ellipsis');
    }
    
    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }
    
    // Add ellipsis if there's a gap between endPage and last page
    if (endPage < totalPages - 1) {
      items.push('ellipsis');
    }
    
    // Always include last page if there's more than one page
    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };

  const paginationItems = generatePaginationItems();

  return (
    <div className="flex items-center justify-center space-x-1">
      <Link
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : '#'}
        className={cn(
          currentPage <= 1 && 'pointer-events-none opacity-50'
        )}
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
      </Link>

      {paginationItems.map((item, i) => (
        item === 'ellipsis' ? (
          <div key={`ellipsis-${i}`} className="flex items-center justify-center h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        ) : (
          <Link
            key={`page-${item}`}
            href={getPageUrl(item)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md',
              currentPage === item
                ? 'bg-primary text-primary-foreground'
                : 'bg-transparent hover:bg-muted'
            )}
            {item}
          </Link>
        )
      ))}

      <Link
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : '#'}
        className={cn(
          currentPage >= totalPages && 'pointer-events-none opacity-50'
        )}
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </Link>
    </div>
  );
};
