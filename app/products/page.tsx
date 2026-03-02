import type { Metadata } from 'next';
import { getProducts, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'All Products | My Online Store',
  description: 'Browse our complete collection of quality products.',
};

export default async function ProductsPage() {
  const [products, reviews] = await Promise.all([getProducts(), getReviews()]);

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

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900">All Products</h1>
        <p className="text-navy-500 mt-2">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">📦</span>
          <h2 className="text-xl font-semibold text-navy-700 mt-4">No products yet</h2>
          <p className="text-navy-400 mt-2">Products added to Cosmic will appear here.</p>
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
    </div>
  );
}