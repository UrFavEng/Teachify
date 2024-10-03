"use client";
import { CartContext } from "@/context/CartContext";
import CartAPIs from "@/utils/CartAPIs";
import { useUser } from "@clerk/nextjs";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
interface HeaderProductProps {
  allProduct: {
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
  };
}

const HeaderProduct = ({ allProduct }: HeaderProductProps) => {
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);
  const { user } = useUser();
  const router = useRouter();
  const handleAddToCart = () => {
    if (user) {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          products: [allProduct.id],
        },
      };
      console.log(allProduct.documentId);

      console.log(
        cart.some(
          (i) => i?.product?.products[0]?.documentId === allProduct.documentId
        )
      );
      if (
        cart.some(
          (i) => i?.product?.products[0]?.documentId === allProduct.documentId
        )
      ) {
        return;
      } else {
        CartAPIs.addToCart(data)
          .then((res) => {
            console.log(res.data.data);
            setCart((old) => [
              ...old,
              { id: res.data.data.id, product: { products: [allProduct] } },
            ]);
          })
          .catch((err) => console.log(err));
      }
    } else {
      router.push("/sign-in");
    }
  };
  // useEffect(() => {
  //   getCartItem();
  // }, [user]);
  // const getCartItem = () => {
  //   console.log("getCartItem");
  //   if (user?.primaryEmailAddress?.emailAddress) {
  //     CartAPIs.getUserCartItems(user?.primaryEmailAddress?.emailAddress)
  //       .then((res) => {
  //         res.data.data.forEach((citem) => {
  //           setCart((old) => [...old, { id: citem.id, product: citem }]);
  //           // setCart((old) => [...old, {}]);
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
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
                  onClick={() => handleAddToCart()}
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
