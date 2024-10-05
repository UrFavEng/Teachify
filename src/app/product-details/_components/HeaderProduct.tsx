"use client";
import {
  useAddToCartMutation,
  useGetUserCartQuery,
} from "@/app/store/apislice";
import {
  AddToCartRequest,
  FileDataById,
  ImageFormatById,
  OrderById,
  RichTextBlock,
} from "@/app/store/types";
import { useUser } from "@clerk/nextjs";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
interface HeaderProductProps {
  allProduct: {
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
    category: string;
    createdAt: string;
    description: Array<RichTextBlock>;
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
}

const HeaderProduct = ({ allProduct }: HeaderProductProps) => {
  const handleDone = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "In Cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const { user } = useUser();

  const { data: dataCartUser } = useGetUserCartQuery({
    email: user?.primaryEmailAddress?.emailAddress,
  });
  const router = useRouter();
  console.log("====////====", dataCartUser?.data);
  const [AddtoCart] = useAddToCartMutation();
  const AddToCartFun = () => {
    if (user) {
      const data: AddToCartRequest = {
        data: {
          userName: user.fullName as string,
          email: user.primaryEmailAddress?.emailAddress as string,
          products: [allProduct.id],
        },
      };
      if (
        !dataCartUser?.data.some(
          (i) => i.products[0].documentId === allProduct.documentId
        )
      ) {
        AddtoCart(data)
          .unwrap()
          .then((fulfilled) => {
            console.log(fulfilled);
            handleDone();
          })
          .catch((rejected) => {
            console.log(rejected);
          });
      } else {
        handleDone();
      }
    } else {
      router.push("/sign-in");
    }
  };
  return (
    <section className="px-4 sm:px-0">
      <div className="mx-auto max-w-screen-xl py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-lg sm:h-80 lg:h-full text-center">
            {allProduct ? (
              <Image
                src={allProduct?.banner?.url}
                alt="banner"
                width={550}
                height={580}
                className="m-auto lg:m-0 rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg" />
            )}
          </div>

          {/* Text Section */}
          <div className="">
            {allProduct ? (
              <>
                <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                  {allProduct.title}
                </h2>
                <p className="font-medium mt-[-2px] text-[14px] text-[#777]">
                  {allProduct.category}
                </p>
                <p className="mt-4 leading-[22px] font-semibold text-gray-600">
                  {allProduct.description[0].children[0].text}
                </p>
                <p className="mt-3 flex gap-1 items-center font-medium text-primary">
                  {allProduct.instantDelivery ? (
                    <BadgeCheck className="text-orange-700" />
                  ) : (
                    <AlertOctagon className="text-orange-700" />
                  )}
                  Eligible For Instant Delivery
                </p>
                <p className="text-[28px] font-bold text-sec mt-3">
                  {allProduct.price} $
                </p>
                <button
                  onClick={() => AddToCartFun()}
                  className="mt-2 flex gap-1 items-center rounded-md transition-all ease-in-out bg-primary px-[18px] py-[8px] text-[16px] font-medium text-bgPrimary hover:bg-hoverColor hover:text-primary"
                >
                  <ShoppingCart /> Add to cart
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-300 animate-pulse rounded" />
                <div className="h-4 w-1/4 bg-gray-300 animate-pulse rounded" />
                <div className="h-4 w-full bg-gray-300 animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded" />
                <div className="h-8 w-1/3 bg-gray-300 animate-pulse rounded" />
                <div className="h-10 w-1/4 bg-primary opacity-30 rounded animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderProduct;
