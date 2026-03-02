import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-navy-100">
      <div className="container-page">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl sm:text-2xl font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
              My Online Store
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/products"
              className="px-4 py-2 text-sm font-medium text-navy-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="px-4 py-2 text-sm font-medium text-navy-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
            >
              Categories
            </Link>
            <Link
              href="/reviews"
              className="px-4 py-2 text-sm font-medium text-navy-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
            >
              Reviews
            </Link>
          </nav>
          {/* Mobile nav */}
          <nav className="flex sm:hidden items-center gap-1">
            <Link
              href="/products"
              className="px-3 py-1.5 text-xs font-medium text-navy-600 hover:text-brand-600 rounded-md transition-colors"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="px-3 py-1.5 text-xs font-medium text-navy-600 hover:text-brand-600 rounded-md transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/reviews"
              className="px-3 py-1.5 text-xs font-medium text-navy-600 hover:text-brand-600 rounded-md transition-colors"
            >
              Reviews
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}