export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    image?: CosmicImage;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description?: string;
    price?: number;
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    inventory_status?: InventoryStatus;
    category?: Category;
  };
}

export type InventoryStatus = 'In Stock' | 'Out of Stock' | 'Low Stock' | 'Pre-order' | string;

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    product?: Product;
    rating?: number;
    reviewer_name?: string;
    review_body?: string;
    verified_purchase?: boolean;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}