'use client';

import { cn } from '@ecommerce/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggler } from './theme-toggler';

const routes = [
  { name: 'home', path: '/' },
  { name: 'products', path: '/products' },
];

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary Navigation">
      <ul className="flex gap-x-2 md:gap-x-6 items-center">
        {routes.map((route) => {
          const isActive = route.path === '/' ? pathname === '/' : pathname.startsWith(route.path);

          return (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  'relative inline-flex items-center p-2 rounded-sm capitalize font-medium tracking-wide transition-all duration-200 hover:text-primary hover:bg-accent/50',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {route.name}
                <span
                  className={cn(
                    'absolute inset-x-0 -bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out',
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0',
                  )}
                />
              </Link>
            </li>
          );
        })}
        <li>
          <ThemeToggler />
        </li>
      </ul>
    </nav>
  );
};
