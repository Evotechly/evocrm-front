import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoPagination({
  page,
  pageCount,
  total,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  pageCount: number;
  total?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}) {
  return (
    <nav data-evo="pagination" className="evo-pagination" aria-label="Pagination">
      <ul className="evo-pagination-list">
        <li>
          <EvoButton size="sm" variant="outline" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>
            Previous
          </EvoButton>
        </li>
        <li>
          <span className="tabular-nums" aria-current="page">
            {page} / {pageCount}
          </span>
        </li>
        <li>
          <EvoButton size="sm" variant="outline" disabled={page >= pageCount} onClick={() => onPageChange?.(page + 1)}>
            Next
          </EvoButton>
        </li>
        <li>
          <label className="evo-label">
            Page size
            <select
              className="evo-input"
              style={{ width: 72, height: 28 }}
              value={pageSize}
              onChange={(event) => onPageSizeChange?.(Number(event.target.value))}
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
        </li>
        {total != null ? <li className="tabular-nums">{total} rows</li> : null}
      </ul>
    </nav>
  );
}

export const Pagination = EvoPagination;
