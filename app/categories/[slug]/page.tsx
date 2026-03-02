// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory, getCategories, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.metadata?.name || category.title} | My Online Store`,
    description: category.metadata?.description || `Browse ${category.title} products at My Online Store.`,
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [products, reviews] = await Promise.all([
    getProductsByCategory(category.id),
    getReviews(),
  ]);

  const ratingsByProduct: Record<string, { total: number; count: number }> = {};
  for (const review of reviews) {
    const productId = review.metadata?.product?.id;
    if (productId && review.metadata?.rating) {
      if (!ratingsByProduct[productId]) {
        ratingsByProduct[productId] = { total: 0, count: 0 };
      }
      ratingsByProduct[productId].total += review.metadata.rating;
      ratingsByProduct[productId].count += 1;
    }
  }

  const image = category.metadata?.image;
  const description = category.metadata?.description;

  return (
    <div>
      {/* Category Hero */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        {image && (
          <img
            src={`${image.imgix_url}?w=1920&h=400&fit=crop&auto=format,compress`}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/60" />
        <div className="container-page relative py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-navy-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-white">{category.metadata?.name || category.title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {category.metadata?.name || category.title}
          </h1>
          {description && (
            <p className="mt-4 text-lg text-navy-200 max-w-2xl">{description}</p>
          )}
          <p className="mt-4 text-sm text-navy-300">
            {products.length} {products.length === 1 ? 'product' : 'products'} in this category
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="container-page py-12 sm:py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl">📦</span>
            <h2 className="text-xl font-semibold text-navy-700 mt-4">No products in this category</h2>
            <p className="text-navy-400 mt-2">Check back soon for new products.</p>
            <Link
              href="/products"
              className="inline-flex items-center mt-6 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Browse all products
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const productRating = ratingsByProduct[product.id];
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  averageRating={productRating ? productRating.total / productRating.count : undefined}
                  reviewCount={productRating?.count}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}