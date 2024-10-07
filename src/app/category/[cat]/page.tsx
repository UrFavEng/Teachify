"use client";
import { useGetAllProductsByCatQuery } from "@/app/store/apislice";
import Breadcrumb from "@/components/Breadcrumb";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import React from "react";
interface pageProps {
  params: { cat: string };
}
const Page = ({ params }: pageProps) => {
  const { data: dataProductsByCat } = useGetAllProductsByCatQuery({
    cat: params?.cat.toUpperCase(),
  });
  console.log(dataProductsByCat);
  return (
    <div>
      <div className=" container px-4 mx-auto min-h-[76vh] py-8">
        {" "}
        <h1 className=" font-bold text-primary text-[26px] capitalize ">
          <Breadcrumb title={params.cat} />
        </h1>
        <div className=" mt-4">
          {dataProductsByCat && <ProductList course={dataProductsByCat.data} />}
        </div>{" "}
      </div>

      <div className="bg-white py-8 pt-[52px]">
        {" "}
        <div className="bg-bgPrimary w-[90%] mx-auto sm:w-auto sm:mx-auto flex-col sm:flex-row rounded-md px-6 sm:px-12 container border-2 flex items-center justify-between py-8 shadow-2xl mb-8 mt-2">
          <div className=" basis-[54%]">
            <h1 className=" text-[18px] lg:text-[24px] mb-1 md:mb-3 font-bold text-sec ">
              Unlock Your Potential: Invest in Knowledge Today!
            </h1>
            <p className=" w-[95%] leading-[18px] md:leading-[22px] sm:w-[85%] text-hoverColor font-medium text-[14px] lg:text-[18px] xl:text-[20px]">
              Invest in your future and own knowledge! Purchase courses now to
              develop your skills and achieve your personal and professional
              goals.
            </p>
          </div>
          <div className=" w-[280px] mt-[28px] sm:mt-0 sm:w-auto sm:basis-[40%]">
            <Image
              alt="photo"
              src={"/bookshelves.svg"}
              width={370}
              height={370}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;