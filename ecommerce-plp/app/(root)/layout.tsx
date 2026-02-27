import Link from 'next/link';
import { Suspense } from 'react';
import { Nav } from 'shared/components/nav';

const FULL_YEAR = new Date().getFullYear();

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b p-4">
        <Link className="p-3 hover:scale-105 transition-all duration-200" href="/">
          <span className="text-3xl uppercase text-[#ff3377] font-extrabold tracking-widest">
            rm
          </span>
        </Link>
        <Suspense fallback="loading...">
          <Nav />
        </Suspense>
      </header>
      <main className="flex flex-1 overflow-auto">{children}</main>
      <footer className="shrink-0 p-8 border-t">
        <div className="flex items-center justify-center">
          <p className="text-center text-muted-foreground">
            Copyright &copy; {FULL_YEAR > 2026 ? `2026-${FULL_YEAR}` : `2026`} Ronel Mayor. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
