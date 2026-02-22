/**
 * Product interface representing an e-commerce product
 * @interface Product
 */
export interface Product {
  /** Unique identifier for the product */
  id: string;
  /** Product name/title */
  name: string;
  /** Product price in rupees */
  price: number;
  /** Product category for filtering and organization */
  category: string;
  /** Array of image URLs for the product */
  images: string[];
  /** Product description (optional) */
  description?: string;
  /** Product rating out of 5 (optional) */
  rating?: number;
  /** Number of customer reviews (optional) */
  reviewCount?: number;
}
