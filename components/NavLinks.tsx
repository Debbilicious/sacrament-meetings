'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'All Meetings' },
    { href: '/meetings/current', label: 'This Week' },
  ];

  return (
    <ul className="flex gap-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={
              pathname === link.href
                ? 'font-bold underline'
                : 'hover:underline'
            }
            aria-current={pathname === link.href ? 'page' : undefined}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}