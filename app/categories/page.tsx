import type { Metadata } from 'next';
import { getCategories, getProducts } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'Categories | My Online Store',
  description: 'Browse products by category at My Online Store.',
};

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const productCountByCategory: Record<string, number> = {};
  for (const product of products) {
    const catId = product.metadata?.category?.id;
    if (catId) {
      productCountByCategory[catId] = (productCountByCategory[catId] || 0) + 1;
    }
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900">Categories</h1>
        <p className="text-navy-500 mt-2">
          Browse our {categories.length} {categories.length === 1 ? 'category' : 'categories'}
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">🏷️</span>
          <h2 className="text-xl font-semibold text-navy-700 mt-4">No categories yet</h2>
          <p className="text-navy-400 mt-2">Categories added to Cosmic will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              productCount={productCountByCategory[category.id] || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}