import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-200 mt-auto">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-bold text-white">My Online Store</span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed">
              Discover quality products curated just for you. Shop with confidence and enjoy a seamless experience.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-navy-300 hover:text-brand-400 text-sm transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-navy-300 hover:text-brand-400 text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-navy-300 hover:text-brand-400 text-sm transition-colors">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Powered By</h3>
            <p className="text-navy-300 text-sm leading-relaxed">
              Content managed with{' '}
              <a
                href="https://www.cosmicjs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 underline transition-colors"
              >
                Cosmic
              </a>
              . Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
        <div className="border-t border-navy-700 mt-8 pt-8 text-center">
          <p className="text-navy-400 text-sm">
            &copy; {currentYear} My Online Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}