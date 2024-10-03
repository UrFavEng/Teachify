"use client";
import Breadcrumb from "@/components/Breadcrumb";
import ProductApis from "@/utils/ProductApis";
import React, { useEffect, useState } from "react";
import HeaderProduct from "../_components/HeaderProduct";
import ProductList from "@/components/ProductList";
interface pageProps {
  params: { id: string };
}
interface Course {
  id: number;
  documentId: string;
  title: string;
  description: {
    children: {
      text: string;
      type: string;
    }[];
    type: string;
  }[];
  price: number;
  banner: {
    alternativeText: string | null;
    caption: string | null;
    createdAt: string;
    documentId: string;
    ext: string;
    formats: {
      medium: {
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
        url: string;
        width: number;
      };
      small: {
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
        };
        resource_type: string;
        size: number;
        sizeInBytes: number;
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
    };
    resource_type: string;
    publishedAt: string;
    size: number;
    updatedAt: string;
    url: string;
    width: number;
  };
  category: string;
  createdAt: string;
  files: {
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
    };
    resource_type: string;
    publishedAt: string;
    size: number;
    updatedAt: string;
    url: string;
    width: number | null;
  }[];
  instantDelivery: boolean;
  locale: string | null;
  localizations: string[]; // Adjust type based on actual structure
  publishedAt: string;
  updatedAt: string;
  whatsIncluded: {
    children: {
      text: string;
      type: string;
    }[];
    type: string;
  }[];
}
const ProductPage = ({ params }: pageProps) => {
  const [allProduct, setallProduct] = useState<Course>();
  const [allProducts, setallProducts] = useState<Course[]>();
  useEffect(() => {
    getLatestProducts_();
  }, [params.id]);
  const getLatestProducts_ = () => {
    ProductApis.getProductById(params.id)
      .then((res) => {
        setallProduct(res.data.data);
        gettProductsByCat(res.data.data.category);
      })
      .catch((error) => console.log(error));
  };
  const gettProductsByCat = (cat: string) => {
    ProductApis.getProductsByCat(cat)
      .then((res) => {
        setallProducts(res.data.data);
      })
      .catch((error) => console.log(error));
  };
  // console.log(allProducts);
  return (
    <div className=" container mx-auto my-10 px-4">
      {allProduct && <Breadcrumb title={allProduct?.title} />}
      <HeaderProduct allProduct={allProduct as Course} />
      {allProducts && <ProductList course={allProducts} />}
    </div>
  );
};

export default ProductPage;
