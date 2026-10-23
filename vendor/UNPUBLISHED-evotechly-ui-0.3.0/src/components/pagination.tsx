import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Button } from './button';
import { cn } from '../utils/cn';

function range(page: number, pageCount: number) {
  const pages: Array<number | 'ellipsis'> = [];
  for (let i = 1; i <= pageCount; i += 1) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== 'ellipsis') pages.push('ellipsis');
  }
  return pages;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const pages = range(page, Math.max(pageCount, 1));
  return (
    <nav className={cn('ev-pagination', className)} aria-label="Pagination">
      <Button
        variant="secondary"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        leadingIcon={<CaretLeft size={14} />}
      >
        Previous
      </Button>
      {pages.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`e-${index}`} aria-hidden>
            …
          </span>
        ) : (
          <Button
            key={item}
            variant={item === page ? 'primary' : 'ghost'}
            size="sm"
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ),
      )}
      <Button
        variant="secondary"
        size="sm"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        trailingIcon={<CaretRight size={14} />}
      >
        Next
      </Button>
      <span className="ev-sr-only" aria-live="polite">
        Page {page} of {pageCount}
      </span>
    </nav>
  );
}
