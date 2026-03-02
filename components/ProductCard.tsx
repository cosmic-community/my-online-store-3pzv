import Link from 'next/link';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  averageRating?: number;
  reviewCount?: number;
}

export default function ProductCard({ product, averageRating, reviewCount }: ProductCardProps) {
  const featuredImage = product.metadata?.featured_image;
  const price = product.metadata?.price;
  const inventoryStatus = product.metadata?.inventory_status;
  const category = product.metadata?.category;

  // Changed: Extract the display value from the select-dropdown object
  const inventoryLabel = typeof inventoryStatus === 'object' && inventoryStatus !== null
    ? (inventoryStatus as { key: string; value: string }).value
    : (inventoryStatus as string | undefined);

  const statusColor = (status: string | undefined): string => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Pre-order':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
        {/* Changed: Render inventoryLabel string instead of inventoryStatus object */}
        {inventoryLabel && (
          <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(inventoryLabel)}`}>
            {inventoryLabel}
          </span>
        )}
      </div>
      <div className="p-5">
        {category && (
          <span className="text-xs font-medium text-brand-600 uppercase tracking-wider">
            {category.title}
          </span>
        )}
        <h3 className="text-lg font-semibold text-navy-900 mt-1 group-hover:text-brand-600 transition-colors line-clamp-2">
          {product.title}
        </h3>
        {averageRating !== undefined && reviewCount !== undefined && reviewCount > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="text-xs text-navy-400">({reviewCount})</span>
          </div>
        )}
        {price !== undefined && price !== null && (
          <p className="text-xl font-bold text-navy-900 mt-3">
            ${Number(price).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
}