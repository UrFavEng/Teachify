"use client";
import { useGetUserCartQuery } from "@/app/store/apislice";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
interface CartProps {
  setShow: (val: boolean) => void;
}
const Cart = ({ setShow }: CartProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useUser();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false); // إغلاق القائمة
      }
    };

    // إضافة المستمع للحدث عند النقر في أي مكان في الصفحة
    document.addEventListener("mousedown", handleClickOutside);

    // تنظيف المستمع عند فك الكومبوننت
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { data } = useGetUserCartQuery({
    email: user?.primaryEmailAddress?.emailAddress,
  });
  return (
    <div
      ref={dropdownRef}
      className="popup h-[50vh] sm:h-[68vh] overflow-auto  z-50 absolute  right-[-50px] sm:right-1 top-[155%] md:top-[135%] rounded-lg shadow-lg w-[280px] sm:w-screen max-w-sm border border-shadowOrBorder bg-bgPrimary px-4 py-8 sm:px-6 lg:px-8"
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
    transform: translateY(-1%); /* تبدأ من خارج الشاشة */
    animation: slideDown 0.3s forwards;
  }

  @keyframes slideDown {
    to {
      transform: translateY(0); /* تتحرك لمكانها الطبيعي */
    }
  }
`}</style>
    </div>
  );
};

export default Cart;
