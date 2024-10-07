import React from "react";
import Image from "next/image";
import { ChartBarStackedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CourseData } from "@/app/store/types";
interface ProductCardProps {
  course:
    | {
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
        category: string;
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
      }
    | CourseData;
}
const ProductCard = ({ course }: ProductCardProps) => {
  // console.log(course);
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product-details/${course.documentId}`)}
      className="px-2 py-2 bg-white rounded-lg cursor-pointer transition-all ease-in-out transform hover:scale-105 shadow-sm hover:border-2 hover:border-shadowOrBorder hover:shadow-lg"
    >
      <div className="w-full max-w-xs relative m-auto">
        <Image
          src={course?.banner?.url} // Add fallback in case no image is available
          alt="Banner"
          width={300} // Fixed width
          height={200} // Use an estimated height
          className="w-full h-auto object-cover aspect-video rounded-[8px]" // Ensure it scales responsively
        />
      </div>
      <div className="mt-2">
        <div className=" flex items-center justify-between ">
          <h3 className=" text-primary font-medium sm:font-semibold sm:text-[18px] line-clamp-1">
            {course.title}
          </h3>
          <span className=" text-[14px] sm:text-[16px] font-medium text-primary">
            {course.price} $
          </span>
        </div>
        <div className=" capitalize flex items-center gap-1 text-[12px] sm:text-[14px] font-medium text-primary">
          <ChartBarStackedIcon size={18} color="#000" />
          {course.category.toLowerCase()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
