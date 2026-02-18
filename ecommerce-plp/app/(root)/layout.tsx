export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between">
        <div>Company Logo</div>
        <nav aria-label="Primary Navigation">
          <ul className="flex gap-x-4">
            <li>Navigation 1</li>
            <li>Navigation 2</li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 flex overflow-auto">{children}</main>
      <footer className="shrink-0">Footer</footer>
    </div>
  );
}
