import React from "react";
import { Course } from "./ProductSection";
import ProductCard from "./ProductCard";
interface ProductListProps {
  course:
    | Course[]
    | {
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
      }[];
}
const ProductList = ({ course }: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-3 ">
      {course?.map((e) => (
        <ProductCard course={e} key={e.id} />
      ))}
    </div>
  );
};

export default ProductList;
