import React from "react";
import ProductCard from "./ProductCard";
import { CourseData } from "@/app/store/types";
interface ProductListProps {
  course:
    | CourseData[]
    | Array<{
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
        category: { title: string };
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
}
const ProductList = ({ course }: ProductListProps) => {
  return (
    <div className="grid px-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-3 ">
      {course?.map((e) => (
        <ProductCard course={e} key={e.id} />
      ))}
    </div>
  );
};

export default ProductList;
