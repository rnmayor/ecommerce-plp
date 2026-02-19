export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b p-4">
        <div>Company Logo</div>
        <nav aria-label="Primary Navigation">
          <ul className="flex gap-x-4">
            <li>Navigation 1</li>
            <li>Navigation 2</li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-1 overflow-auto">{children}</main>
      <footer className="shrink-0 p-4 border-t">Footer</footer>
    </div>
  );
}
