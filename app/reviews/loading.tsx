export default function ReviewsLoading() {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-10">
        <div className="h-9 w-56 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-36 bg-gray-100 rounded mt-2 animate-pulse" />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-10 animate-pulse">
        <div className="h-20 bg-gray-100 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}