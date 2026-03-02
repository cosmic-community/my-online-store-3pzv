// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsByProduct, getProducts } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} | My Online Store`,
    description: product.metadata?.description || `Shop ${product.title} at My Online Store.`,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);

  const featuredImage = product.metadata?.featured_image;
  const gallery = product.metadata?.gallery;
  const price = product.metadata?.price;
  const description = product.metadata?.description;
  const inventoryStatus = product.metadata?.inventory_status;
  const category = product.metadata?.category;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
      : 0;

  const statusColor = (status: string | undefined): string => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Pre-order':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container-page py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-navy-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-navy-700 font-medium truncate">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Image Section */}
        <div>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {featuredImage ? (
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                width={600}
                height={600}
                className="w-full aspect-square object-cover"
              />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center bg-gray-50 text-gray-300">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            )}
          </div>

          {/* Gallery */}
          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {gallery.map((img, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-gray-100 bg-white">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${product.title} gallery image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-xs font-semibold text-brand-600 uppercase tracking-wider hover:text-brand-700 transition-colors"
            >
              {category.title}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-2">{product.title}</h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-4">
              <StarRating rating={averageRating} size="md" showNumber />
              <span className="text-sm text-navy-400">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          {price !== undefined && price !== null && (
            <p className="text-3xl font-bold text-navy-900 mt-6">
              ${Number(price).toFixed(2)}
            </p>
          )}

          {inventoryStatus && (
            <div className="mt-4">
              <span className={`inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-full border ${statusColor(inventoryStatus)}`}>
                {inventoryStatus === 'In Stock' && (
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {inventoryStatus}
              </span>
            </div>
          )}

          {description && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-navy-900 mb-3">Description</h2>
              <div className="text-navy-600 leading-relaxed whitespace-pre-line">{description}</div>
            </div>
          )}

          {product.content && (
            <div className="mt-6 prose prose-navy max-w-none text-navy-600" dangerouslySetInnerHTML={{ __html: product.content }} />
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16 sm:mt-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-navy-900">Customer Reviews</h2>
          {reviews.length > 0 && (
            <span className="text-sm text-navy-400 bg-navy-50 px-3 py-1 rounded-full font-medium">
              {reviews.length}
            </span>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <span className="text-4xl">💬</span>
            <p className="text-navy-500 mt-3">No reviews yet for this product.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}