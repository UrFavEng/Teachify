"use client";
import { useGetUserCartQuery } from "@/app/store/apislice";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface CartProps {
  setShow: (val: boolean) => void;
}
const Cart = ({ setShow }: CartProps) => {
  const { user } = useUser();

  const { data } = useGetUserCartQuery({
    email: user?.primaryEmailAddress?.emailAddress,
  });
  // const { cart } = useContext(CartContext);
  // console.log("cart => ", cart);
  return (
    <div
      className="popup h-[50vh] sm:h-[68vh] overflow-auto  z-10 absolute  right-[-50px] sm:right-1 top-[120%] rounded-lg shadow-lg w-[280px] sm:w-screen max-w-sm border border-shadowOrBorder bg-bgPrimary px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <button
        onClick={() => setShow(false)}
        className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
      >
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {data?.data?.map((e) => (
            <li key={e.products[0].id} className="flex items-center gap-4">
              <Image
                width={100}
                height={100}
                alt=""
                className=" aspect-video w-[100px] rounded object-cover"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                src={e?.products[0].banner.url}
              />

              <div className=" mt-[-8px]">
                <h3 className=" font-bold text-primary line-clamp-1">
                  {e?.products[0].title}
                </h3>

                <dl className=" space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Category: </dt>
                    <dd className="inline text-sec font-medium">
                      {" "}
                      {e?.products[0].category}
                    </dd>
                  </div>

                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline text-sec font-medium">
                      {" "}
                      {e?.products[0].price} $
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart ({data?.data.length})
          </Link>

          <a
            href="/"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>{" "}
      <style>{`
  .popup {
    transform: scale(0.5); /* تبدأ صغيرة */
    animation: zoomIn 0.5s forwards;
  }

  @keyframes zoomIn {
    to {
      transform: scale(1); /* تكبر للحجم الطبيعي */
    }
  }
`}</style>
    </div>
  );
};

export default Cart;
