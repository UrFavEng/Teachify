"use client";
import { useSearchProductsQuery } from "@/app/store/apislice";
import Breadcrumb from "@/components/Breadcrumb";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import React from "react";
import { PulseLoader } from "react-spinners";
interface PageProps {
  params: { name: string };
}
const Page = ({ params }: PageProps) => {
  const { data, isLoading, isFetching } = useSearchProductsQuery(params.name, {
    skip: !params.name,
  });
  return (
    <div>
      <div className=" min-h-[78vh] container mx-auto px-4">
        {" "}
        <div className=" mt-8">
          {" "}
          <Breadcrumb title={params.name} />
        </div>
        {isLoading && isFetching ? (
          <>
            <PulseLoader className=" text-center my-12" color="#3B4158" />
          </>
        ) : (
          <>
            {" "}
            <div className=" mt-8 mb-6">
              <ProductList course={data?.data} />
            </div>
          </>
        )}
      </div>
      <div className="bg-white py-8 pt-[52px]">
        {" "}
        <div className="bg-bgPrimary w-[90%] mx-auto sm:w-auto sm:mx-auto flex-col sm:flex-row rounded-md px-6 sm:px-12 container border-2 flex items-center justify-between py-8 shadow-2xl mb-8 mt-2">
          <div className=" basis-[54%]">
            <h1 className=" text-[18px] lg:text-[24px] mb-1 md:mb-3 font-bold text-sec ">
              Empower yourself with the key to success - invest in knowledge
              today!{" "}
            </h1>
            <p className=" w-[95%] leading-[18px] md:leading-[22px] sm:w-[85%] text-hoverColor font-medium text-[14px] lg:text-[18px] xl:text-[20px]">
              Take control of your future and expand your knowledge base! Invest
              in courses now to refine your skills and fulfill your personal and
              career objectives.
            </p>
          </div>
          <div className=" w-[280px] mt-[28px] sm:mt-0 sm:w-auto sm:basis-[40%]">
            <Image
              alt="photo"
              src={"/searching.svg"}
              width={320}
              height={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
