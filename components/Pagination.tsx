'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Meetings pagination" className="flex gap-4 mt-6 items-center">
      <Link
        href={createPageURL(currentPage - 1)}
        aria-disabled={currentPage <= 1}
        className={`px-3 py-1 border rounded ${
          currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
        }`}
      >
        Previous
      </Link>
      <span className="px-3 py-1">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={createPageURL(currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        className={`px-3 py-1 border rounded ${
          currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}