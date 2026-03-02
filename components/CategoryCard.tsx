import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  const image = category.metadata?.image;
  const description = category.metadata?.description;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={category.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
            <span className="text-5xl">🏷️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-white group-hover:text-brand-200 transition-colors">
            {category.metadata?.name || category.title}
          </h3>
          {description && (
            <p className="text-sm text-white/80 mt-1 line-clamp-2">{description}</p>
          )}
          {productCount !== undefined && (
            <span className="inline-block mt-2 text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}