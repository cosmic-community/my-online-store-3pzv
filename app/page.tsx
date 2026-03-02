import Link from 'next/link';
import { getProducts, getCategories, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ReviewCard from '@/components/ReviewCard';
import type { Review } from '@/types';

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ]);

  // Calculate average ratings per product
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

  // Count products per category
  const productCountByCategory: Record<string, number> = {};
  for (const product of products) {
    const catId = product.metadata?.category?.id;
    if (catId) {
      productCountByCategory[catId] = (productCountByCategory[catId] || 0) + 1;
    }
  }

  const featuredProducts = products.slice(0, 4);
  const featuredCategories = categories.slice(0, 3);
  const latestReviews = reviews
    .sort((a: Review, b: Review) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-500 rounded-full blur-3xl" />
        </div>
        <div className="container-page relative py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Welcome to <br />
              <span className="text-brand-400">My Online Store</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-navy-200 leading-relaxed max-w-2xl">
              Discover quality products curated just for you. Browse our collection, read customer reviews, and shop with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-brand-500/25"
              >
                Shop Products
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors backdrop-blur-sm border border-white/20"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <p className="text-3xl font-bold text-brand-400">{products.length}</p>
              <p className="text-sm text-navy-300 mt-1">Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-400">{categories.length}</p>
              <p className="text-sm text-navy-300 mt-1">Categories</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-400">{reviews.length}</p>
              <p className="text-sm text-navy-300 mt-1">Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="container-page py-16 sm:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Featured Products</h2>
              <p className="text-navy-500 mt-1">Our latest additions to the store</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              View all
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
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
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              View all products
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      {featuredCategories.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-page">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Shop by Category</h2>
                <p className="text-navy-500 mt-1">Find exactly what you&apos;re looking for</p>
              </div>
              <Link
                href="/categories"
                className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                All categories
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={productCountByCategory[category.id] || 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Reviews */}
      {latestReviews.length > 0 && (
        <section className="container-page py-16 sm:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Customer Reviews</h2>
              <p className="text-navy-500 mt-1">What our customers are saying</p>
            </div>
            <Link
              href="/reviews"
              className="hidden sm:inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              All reviews
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}