interface Banner {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  documentId: string;
  ext: string;
  formats: {
    small: {
      ext: string;
      hash: string;
      height: number;
      mime: string;
      name: string;
      path: string | null;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
      size: number;
      url: string;
      width: number;
    };
    thumbnail: {
      ext: string;
      hash: string;
      height: number;
      mime: string;
      name: string;
      path: string | null;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
      size: number;
      url: string;
      width: number;
    };
  };
  hash: string;
  height: number;
  id: number;
  locale: string | null;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  publishedAt: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

export interface CourseData {
  banner: Banner;
  id: number;
  documentId: string;
  title: string;
  description: {
    children: {
      text: string;
    }[];
    type: string;
  }[];
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: { title: string };
  whatsIncluded: {
    children: {
      text: string;
    }[];
    type: string;
  }[];
  files: {
    alternativeText: string | null;
    caption: string | null;
    createdAt: string;
    documentId: string;
    ext: string;
    hash: string;
    height: number | null;
    mime: string;
    name: string;
    path: string | null;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    size: number;
    url: string;
    width: number | null;
  }[];
  images?: {
    alternativeText: string | null;
    caption: string | null;
    createdAt: string;
    documentId: string;
    ext: string;
    formats: {
      large?: {
        ext: string;
        hash: string;
        height: number;
        mime: string;
        name: string;
        path: string | null;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
        size: number;
        url: string;
        width: number;
      };
      medium?: {
        ext: string;
        hash: string;
        height: number;
        mime: string;
        name: string;
        path: string | null;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
        size: number;
        url: string;
        width: number;
      };
      small?: {
        ext: string;
        hash: string;
        height: number;
        mime: string;
        name: string;
        path: string | null;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
        size: number;
        url: string;
        width: number;
      };
      thumbnail?: {
        ext: string;
        hash: string;
        height: number;
        mime: string;
        name: string;
        path: string | null;
        provider_metadata: {
          public_id: string;
          resource_type: string;
        };
        size: number;
        url: string;
        width: number;
      };
    };
    hash: string;
    height: number;
    mime: string;
    name: string;
    path: string | null;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    size: number;
    url: string;
    width: number;
  }[];
}

export interface CourseResponse {
  data: CourseData[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
//---------------------

export interface ProductById {
  data: {
    Included: string[];
    category: { title: string };
    banner: {
      alternativeText: string | null;
      caption: string | null;
      createdAt: string;
      documentId: string;
      ext: string;
      formats: {
        small: ImageFormatById;
        thumbnail: ImageFormatById;
      };
      hash: string;
      height: number;
      mime: string;
      name: string;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
      size: number;
      url: string;
      width: number;
    };
    createdAt: string;
    description: string;
    documentId: string;
    files: Array<FileDataById>;
    id: number;
    instantDelivery: boolean;
    locale: string | null;
    localizations: Array<string>;
    orders: Array<OrderById>;
    price: number;
    publishedAt: string;
    title: string;
    updatedAt: string;
    whatsIncluded: Array<RichTextBlock>;
  };
  meta: Record<string, unknown>;
}

export interface ImageFormatById {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  size: number;
  url: string;
  width: number;
}

export interface RichTextBlock {
  children: Array<RichTextChildById>;
  type: string;
}

interface RichTextChildById {
  text: string;
  type: string;
}

export interface FileDataById {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  documentId: string;
  ext: string;
  formats: null;
  hash: string;
  height: number | null;
  id: number;
  locale: string | null;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  publishedAt: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number | null;
}

export interface OrderById {
  amount: number;
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  locale: string | null;
  publishedAt: string;
  updatedAt: string;
  userName: string;
}
//------------
export interface dataProductsByCat {
  data: Array<{
    category: { title: string };
    id: number;
    documentId: string;
    title: string;
    description: Array<{
      children: Array<{
        text: string;
        type: string;
      }>;
      type: string;
    }>;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    whatsIncluded: Array<{
      children: Array<{
        text: string;
        type: string;
      }>;
      type: string;
    }>;
    banner: {
      alternativeText: string | null;
      caption: string | null;
      createdAt: string;
      documentId: string;
      ext: string;
      formats: {
        large?: {
          ext: string;
          hash: string;
          height: number;
          mime: string;
          name: string;
          path: string | null;
          provider_metadata: {
            public_id: string;
            resource_type: string;
          };
          size: number;
          sizeInBytes?: number;
          url: string;
          width: number;
        };
        medium?: {
          ext: string;
          hash: string;
          height: number;
          mime: string;
          name: string;
          path: string | null;
          provider_metadata: {
            public_id: string;
            resource_type: string;
          };
          size: number;
          sizeInBytes?: number;
          url: string;
          width: number;
        };
        small?: {
          ext: string;
          hash: string;
          height: number;
          mime: string;
          name: string;
          path: string | null;
          provider_metadata: {
            public_id: string;
            resource_type: string;
          };
          size: number;
          sizeInBytes?: number;
          url: string;
          width: number;
        };
        thumbnail?: {
          ext: string;
          hash: string;
          height: number;
          mime: string;
          name: string;
          path: string | null;
          provider_metadata: {
            public_id: string;
            resource_type: string;
          };
          size: number;
          sizeInBytes?: number;
          url: string;
          width: number;
        };
      };
      hash: string;
      height: number;
      id: number;
      locale: string | null;
      mime: string;
      name: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
      publishedAt: string;
      size: number;
      updatedAt: string;
      url: string;
      width: number;
    };
    files: Array<{
      alternativeText: string | null;
      caption: string | null;
      createdAt: string;
      documentId: string;
      ext: string;
      formats: null;
      hash: string;
      height: number | null;
      id: number;
      locale: string | null;
      mime: string;
      name: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
      publishedAt: string;
      size: number;
      updatedAt: string;
      url: string;
      width: number | null;
    }>;
    instantDelivery: boolean | null;
    locale: string | null;
    localizations: string[]; // Replace 'any' with the specific type if known
    orders: string[]; // Replace 'any' with the specific type if known
  }>;
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
//---------
interface FormatCartContext {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  size: number;
  url: string;
  width: number;
}

interface FileCartContext {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  documentId: string;
  ext: string;
  formats: {
    small?: FormatCartContext;
    thumbnail?: FormatCartContext;
  };
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  publishedAt: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

interface DescriptionCartContext {
  children: Array<{
    text: string;
    type: string;
  }>;
  type: string;
}

interface WhatsIncludedCartContext {
  children: Array<{
    text: string;
    type: string;
  }>;
  type: string;
}

interface ProductItemCartContext {
  banner: FileCartContext;
  category: string;
  createdAt: string;
  description: DescriptionCartContext[];
  documentId: string;
  files: FileCartContext[];
  id: number;
  instantDelivery: boolean;
  locale: string | null;
  localizations: string[];
  orders: string[];
  price: number;
  publishedAt: string;
  title: string;
  updatedAt: string;
  whatsIncluded: WhatsIncludedCartContext[];
}

interface ProductCartContext {
  publishedAt?: string;
  updatedAt?: string;
  userName?: string;
  documentId?: string;
  products: ProductItemCartContext[];
}

export interface ExampleDataCartContext {
  id: number;
  product: ProductCartContext;
}
//-------
export interface AddToCartRequest {
  data: {
    userName: string;
    email: string;
    products: number[];
  };
}
interface UserDataAddToCart {
  createdAt: string; // ISO date string
  documentId: string;
  email: string;
  id: number;
  locale: string | null; // locale can be string or null
  publishedAt: string; // ISO date string
  updatedAt: string; // ISO date string
  userName: string;
}

export interface ApiResponseAddToCart {
  data: UserDataAddToCart;
  meta: Record<string, unknown>; // Use a more specific type if you know the structure of meta
}
//-----------
interface ProductImageGetCartUser {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string; // ISO date string
  documentId: string;
  ext: string; // e.g., ".jpg"
  formats: {
    small: ImageFormatGetCartUser;
    thumbnail: ImageFormatGetCartUser;
  };
  hash: string;
  height: number;
  mime: string; // e.g., "image/jpeg"
  name: string;
  path: string | null;
  provider: string; // e.g., "cloudinary"
  provider_metadata: {
    public_id: string;
  };
  resource_type: string; // e.g., "image"
  size: number; // Size in MB
  sizeInBytes: number; // Size in bytes
  url: string; // URL to the image
  width: number;
}

interface ImageFormatGetCartUser {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  provider_metadata: {
    public_id: string;
  };
  resource_type: string;
  size: number;
  sizeInBytes: number;
  url: string; // URL to the image
  width: number;
}

interface ProductDescriptionGetCartUser {
  children: Array<{
    text: string;
    type: string; // e.g., "text"
  }>;
  type: string; // e.g., "paragraph"
}

interface ProductGetCartUser {
  createdAt: string; // ISO date string
  documentId: string;
  id: number;
  locale: string | null;
  price: number;
  title: string;
  category: string; // e.g., "TECH"
  description: ProductDescriptionGetCartUser[];
  instantDelivery: boolean;
  publishedAt: string; // ISO date string
  updatedAt: string; // ISO date string
  whatsIncluded: ProductDescriptionGetCartUser[];
  images: ProductImageGetCartUser[]; // Assuming images is an array of images
}

interface UserDataGetCartUser {
  createdAt: string; // ISO date string
  documentId: string;
  email: string;
  id: number;
  locale: string | null;
  userName: string;
}

export interface ApiResponseGetCartUser {
  data: Array<{
    user: UserDataGetCartUser;
    products: ProductGetCartUser[];
  }>;
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
//-------

export interface CreateOrderReq {
  data: {
    userName: string;
    email: string;
    amount: number;
    products: string[];
  };
}
//----------
export interface getAllCat {
  data: {
    id: number;
    documentId: string;
    category: string;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
//-

export interface CreateReviewReq {
  data: {
    rating: number | null;
    comment: string;
    product: string;
    userName: string | null;
    userId: string;
    imgUrl: string;
  };
}
//-
interface CateRes {
  createdAt: string;
  documentId: string;
  id: 2;
  locale: null;
  publishedAt: string;
  title: string;
  updatedAt: string;
}
export interface getCategories {
  data: CateRes[];
}

//-----------
interface ProductUser {
  id: number;
  documentId: string;
  title: string;
  description: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
  price: number;
  instantDelivery: string | null;
  whatsIncluded: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface OrderUser {
  id: number;
  documentId: string;
  userName: string;
  email: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  products: ProductUser[];
  localizations: null;
}

interface PaginationUser {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface MetaUser {
  pagination: PaginationUser;
}

export interface OrdersUserRes {
  data: OrderUser[];
  meta: MetaUser;
}
//---
interface DocumentItemMylearning {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  instantDelivery: string | null;
  whatsIncluded: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  banner: BannerMylearing;
  files: FileItem[] | null;
  orders: OrderMylearing[];
  reviews: Review[];
  category: CategoryMyleraing;
  localizations: null;
  Included: string[];
}

interface BannerMylearing {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: BannerFormatsMyleaing;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadataMyleaing;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface BannerFormatsMyleaing {
  thumbnail: ImageFormatMylearing;
  small: ImageFormatMylearing;
  medium: ImageFormatMylearing;
  large: ImageFormatMylearing;
}

interface ImageFormatMylearing {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
  provider_metadata: ProviderMetadataMyleaing;
}

interface ProviderMetadataMyleaing {
  public_id: string;
  resource_type: string;
}

interface FileItem {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadataMyleaing;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface OrderMylearing {
  id: number;
  documentId: string;
  userName: string;
  email: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface Review {
  id: number;
  documentId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  userName: string;
  userId: string;
  imgUrl: string;
  reviewed: string;
}

interface CategoryMyleraing {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface ApiResMylearning {
  data: DocumentItemMylearning[];
}
