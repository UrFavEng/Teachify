"use client";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
interface CartProps {
  setShow: (val: boolean) => void;
}
const Cart = ({ setShow }: CartProps) => {
  const { cart, setCart } = useContext(CartContext);
  console.log("cart => ", cart);
  return (
    <div
      className=" h-[50vh] sm:h-[68vh] overflow-auto  z-10 absolute  right-[-50px] sm:right-1 top-[120%] rounded-lg shadow-lg w-[280px] sm:w-screen max-w-sm border border-shadowOrBorder bg-bgPrimary px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
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
          {cart?.map((e) => (
            <li key={e.id} className="flex items-center gap-4">
              <Image
                width={100}
                height={100}
                alt=""
                className=" aspect-video w-[100px] rounded object-cover"
                src={e?.product?.products[0].banner?.url}
              />

              <div className=" mt-[-8px]">
                <h3 className=" font-bold text-primary line-clamp-1">
                  {e?.product?.products[0].title}
                </h3>

                <dl className=" space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Category: </dt>
                    <dd className="inline text-sec font-medium">
                      {" "}
                      {e?.product?.products[0].category}
                    </dd>
                  </div>

                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline text-sec font-medium">
                      {" "}
                      {e?.product?.products[0].price} $
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
            View my cart ({cart.length})
          </Link>

          <a
            href="/"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
