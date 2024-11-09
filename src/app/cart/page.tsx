"use client";
// import CartAPIs from "@/utils/CartAPIs";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useDeleteCartMutation, useGetUserCartQuery } from "../store/apislice";
import { useUser } from "@clerk/nextjs";
import { PulseLoader } from "react-spinners";

const CartPage = () => {
  const { user } = useUser();

  const { data, isLoading, isFetching } = useGetUserCartQuery({
    email: user?.primaryEmailAddress?.emailAddress,
  });
  const router = useRouter();
  console.log(data);
  const getTotalAmount = () => {
    let total = 0;
    data?.data.forEach((item) => {
      total = total + Number(item?.products[0]?.price);
    });
    return total;
  };
  const [DeleteCart] = useDeleteCartMutation();

  const deleteItem = (id: string) => {
    DeleteCart({ id })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        // console.log("cart =>", cart);
        console.log("id =>", id);
        // setCart((old) => old?.filter((i) => i?.product?.documentId !== id));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
    // CartAPIs.deleteCart(id).then(() => {});
  };
  return (
    <section className=" px-4 min-h-[80vh]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {isLoading && isFetching ? (
                <PulseLoader color="#3B4158" className=" text-center" />
              ) : (
                <>
                  {" "}
                  {data?.data.map((i) => (
                    <li
                      key={i.products[0].id}
                      className="flex items-center gap-4"
                    >
                      <>{console.log(i)}</>
                      <Image
                        width={500}
                        height={400}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        src={i?.products[0].banner.url}
                        alt=""
                        className=" w-[140px] aspect-video rounded object-cover"
                      />

                      <div className="">
                        <h3 className="text-[18px]  mt-[-20px] font-bold text-primary ">
                          {" "}
                          {i?.products[0].title}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Category: </dt>
                            <dd className="inline">
                              {" "}
                              {i?.products[0].category}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <span className=" text-sec font-semibold text-[16px]">
                          {i.products[0].price} ${" "}
                        </span>
                        <button
                          onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            deleteItem(i?.documentId);
                            // console.log("0000====>>>>", i);
                          }}
                          className="text-gray-600 transition hover:text-red-600"
                        >
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>{getTotalAmount()} $</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  {getTotalAmount() !== 0 && (
                    <>
                      {" "}
                      <button
                        onClick={() =>
                          router.push(`/checkout?amount=${getTotalAmount()}`)
                        }
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Checkout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
