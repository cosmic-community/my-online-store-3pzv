export default function ProductsLoading() {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-10">
        <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-32 bg-gray-100 rounded mt-2 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <div className="aspect-square bg-gray-100 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}