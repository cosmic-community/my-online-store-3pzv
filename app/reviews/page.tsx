import type { Metadata } from 'next';
import { getReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';
import type { Review } from '@/types';

export const metadata: Metadata = {
  title: 'Customer Reviews | My Online Store',
  description: 'Read reviews from our valued customers at My Online Store.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const sortedReviews = reviews.sort(
    (a: Review, b: Review) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / totalReviews
      : 0;

  const ratingDistribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const review of reviews) {
    const rating = Math.round(review.metadata?.rating ?? 0);
    if (rating >= 1 && rating <= 5) {
      ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
    }
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900">Customer Reviews</h1>
        <p className="text-navy-500 mt-2">
          {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'} from our customers
        </p>
      </div>

      {totalReviews === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">⭐</span>
          <h2 className="text-xl font-semibold text-navy-700 mt-4">No reviews yet</h2>
          <p className="text-navy-400 mt-2">Customer reviews will appear here once added.</p>
        </div>
      ) : (
        <>
          {/* Rating Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <div className="text-center">
                <p className="text-5xl font-bold text-navy-900">{averageRating.toFixed(1)}</p>
                <div className="flex items-center justify-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-200'}`}
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
                <p className="text-sm text-navy-400 mt-1">Based on {totalReviews} reviews</p>
              </div>
              <div className="flex-1 w-full space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingDistribution[star] ?? 0;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-navy-600 w-8">{star} ★</span>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-navy-400 w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct />
            ))}
          </div>
        </>
      )}
    </div>
  );
}