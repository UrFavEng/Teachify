"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductApis from "@/utils/ProductApis";
export interface Course {
  id: number;
  title: string;
  category: string;
  price: number;
  instantDelivery: boolean;
  description: {
    children: { text: string; type: string }[];
    type: string;
  }[];
  whatsIncluded: {
    children: { text: string; type: string }[];
    type: string;
  }[];
  banner: {
    alternativeText: string | null;
    caption: string | null;
    createdAt: string;
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
    mime: string;
    name: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    size: number;
    url: string;
    width: number;
  };
  files: {
    id: number;
    name: string;
    ext: string;
    mime: string;
    url: string;
    size: number;
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
}

const ProductSection = () => {
  const [allProduct, setallProduct] = useState<Course[]>();
  useEffect(() => {
    getLatestProducts_();
  }, []);
  const getLatestProducts_ = () => {
    ProductApis.getLatestProducts().then((res) => {
      setallProduct(res.data.data);
    });
  };

  return (
    <div className=" container mx-auto py-8 px-4 sm:px-0 ">
      <h1 className=" mb-6 text-[24px] font-bold text-primary">
        Our Latest Products
      </h1>
      {allProduct && <ProductList course={allProduct} />}
    </div>
  );
};

export default ProductSection;
