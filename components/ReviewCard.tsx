import StarRating from '@/components/StarRating';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  // Changed: Extract numeric rating from select-dropdown object {key, value}
  const rawRating = review.metadata?.rating;
  const rating = typeof rawRating === 'object' && rawRating !== null
    ? Number((rawRating as { key: string; value: string }).value) || 0
    : Number(rawRating) || 0;

  const reviewerName = review.metadata?.reviewer_name || 'Anonymous';
  const reviewBody = review.metadata?.review_body || '';
  const verifiedPurchase = review.metadata?.verified_purchase;
  const product = review.metadata?.product;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
              {reviewerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-navy-900">{reviewerName}</p>
              {verifiedPurchase && (
                <span className="inline-flex items-center gap-1 text-xs text-green-700 font-medium">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>

      {showProduct && product && (
        <div className="mt-3 mb-2">
          <span className="text-xs font-medium text-navy-400">Product: </span>
          <span className="text-xs font-semibold text-brand-600">{product.title}</span>
        </div>
      )}

      {reviewBody && (
        <p className="mt-3 text-navy-600 text-sm leading-relaxed">{reviewBody}</p>
      )}

      <p className="mt-4 text-xs text-navy-300">
        {new Date(review.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
}