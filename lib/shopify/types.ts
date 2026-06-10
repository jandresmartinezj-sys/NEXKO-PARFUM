export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
  };
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ProductVariant[];
  totalInventory?: number | null;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: Product[];
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: CartLine[];
}

export type GenderTag = "dama" | "caballero" | "unisex";
export type CategoryTag =
  | "arabes"
  | "masculinos"
  | "femeninos"
  | "body-spray"
  | "sets";
