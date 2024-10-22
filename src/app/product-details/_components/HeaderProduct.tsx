"use client";
import {
  useAddToCartMutation,
  useGetAllOrdersUserQuery,
  useGetUserCartQuery,
} from "@/app/store/apislice";
import {
  AddToCartRequest,
  FileDataById,
  ImageFormatById,
  OrderById,
  OrdersUserRes,
  RichTextBlock,
} from "@/app/store/types";
import { useUser } from "@clerk/nextjs";
import {
  AlertOctagon,
  BadgeCheck,
  MonitorDot,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
interface HeaderProductProps {
  allProduct: {
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
}
function getAllProductDocumentIds(response: OrdersUserRes) {
  // إنشاء مصفوفة لتخزين كل documentId الخاص بالمنتجات
  const productDocumentIds: string[] = [];

  // التحقق من وجود البيانات في الاستجابة
  if (response?.data?.length > 0) {
    // التنقل عبر كل order في الاستجابة
    response.data.forEach((order) => {
      // التحقق من وجود منتجات في order الحالي
      if (order.products && order.products.length > 0) {
        // جمع كل documentId الخاص بالمنتجات في order
        order.products.forEach((product) => {
          productDocumentIds.push(product.documentId);
        });
      }
    });
  }

  // إعادة مصفوفة documentId التي تم جمعها
  return productDocumentIds;
}
const HeaderProduct = ({ allProduct }: HeaderProductProps) => {
  const [ordersUsers, setOrdersUsers] = useState<string[]>([]);
  const handleDone = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "In Cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const HandleAlreadyDone = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "You have already purchased the course before.",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleErr = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Something wrong, try later",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const { user } = useUser();

  const {
    data: dataCartUser,
    isLoading,
    isFetching,
  } = useGetUserCartQuery({
    email: user?.primaryEmailAddress?.emailAddress,
  });
  const router = useRouter();
  const [AddtoCart] = useAddToCartMutation();
  const { data: ordersUser } = useGetAllOrdersUserQuery(
    user?.primaryEmailAddress?.emailAddress as string
  );
  console.log(getAllProductDocumentIds(ordersUser as OrdersUserRes));
  useEffect(() => {
    if (ordersUser) {
      setOrdersUsers(getAllProductDocumentIds(ordersUser as OrdersUserRes));
    }
  }, [ordersUser]);
  const AddToCartFun = () => {
    if (user) {
      if (ordersUsers.includes(allProduct.documentId)) {
        HandleAlreadyDone();
      } else {
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
            .then(() => {
              handleDone();
            })
            .catch((rejected) => {
              handleErr();
              console.log(rejected);
            });
        } else {
          handleDone();
        }
      }
    } else {
      router.push("/sign-in");
    }
  };
  return (
    <section className="px-4 sm:px-0">
      <div className="mx-auto max-w-screen-xl py-8 sm:py-12 lg:py-16">
        <div className="flex-col lg:flex-row   flex items-start justify-start gap-4  w-full xl:basis-[30%] mb-4 xl:mb-0 h-full">
          {/* Image Section */}
          <div className="relative overflow-hidden w-full lg:w-[540px]  xl:w-[580px] rounded-lg   text-center">
            {allProduct ? (
              <Image
                src={allProduct?.banner?.url}
                alt="banner"
                width={400}
                height={400}
                className=" rounded-lg w-full  lg:w-[540px]  xl:w-[580px] shadow-lg object-contain    "
              />
            ) : (
              <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg" />
            )}
          </div>
          {/* Text Section */}
          <div className=" relative w-full lg:basis-[55%] xl:basis-[65%]">
            {allProduct ? (
              <>
                <h2 className=" text-[28px] lg:text-[24px] lg:text-3xl capitalize font-bold text-primary ">
                  {allProduct.title}
                </h2>
                <p className="font-medium mt-[-6px] xl:mt-[-2px] text-[14px] text-[#777]">
                  {allProduct.category.title}
                </p>
                <h3 className=" text-sec font-semibold">
                  What&apos;s included
                </h3>
                {allProduct?.Included?.map((e) => (
                  <p
                    key={e}
                    className=" my-1 flex items-center gap-1 lg:text-[14px] font-medium text-sec"
                  >
                    <MonitorDot size={14} className=" mt-[3px]" />
                    {e}
                  </p>
                ))}
                <span className=" text-primary text-[14px]  font-medium">
                  ({allProduct?.files?.length}) Lecture
                </span>
                <p className="mt-3 flex gap-1 items-center font-medium text-primary">
                  {allProduct.instantDelivery ? (
                    <BadgeCheck className="text-orange-700 mt-[2px]" />
                  ) : (
                    <AlertOctagon className="text-orange-700 mt-[2px]" />
                  )}
                  Eligible For Instant Delivery
                </p>
                <p className="text-[28px] absolute top-0 right-0 font-bold text-sec">
                  {allProduct.price} $
                </p>
                {isFetching && isLoading ? (
                  <>
                    {" "}
                    <PulseLoader className=" mt-4" color="#3B4158" />
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      onClick={() => AddToCartFun()}
                      className="mt-6 flex gap-1 items-center rounded-md transition-all ease-in-out bg-primary px-[18px] py-[8px] text-[16px] font-medium text-bgPrimary hover:bg-hoverColor hover:text-primary"
                    >
                      <ShoppingCart /> Add to cart
                    </button>
                  </>
                )}
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
          </div>{" "}
        </div>{" "}
        <p className="mt-8 font-medium  leading-[18px] lg:leading-normal lg:text-[15px] text-sec">
          <span className=" text-[16px] font-bold text-[#464646] ">
            Description:
          </span>{" "}
          {allProduct.description}
        </p>
      </div>
    </section>
  );
};

export default HeaderProduct;
