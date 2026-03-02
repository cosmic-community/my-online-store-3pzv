export default function CategoriesLoading() {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-10">
        <div className="h-9 w-40 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-28 bg-gray-100 rounded mt-2 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}