interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function StarRating({ rating, size = 'md', showNumber = false }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const safeRating = Math.min(Math.max(rating || 0, 0), 5);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index < Math.round(safeRating);
          return (
            <svg
              key={index}
              className={`${sizeClasses[size]} ${filled ? 'text-yellow-400' : 'text-gray-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
                clipRule="evenodd"
              />
            </svg>
          );
        })}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} font-medium text-navy-600 ml-1`}>
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}