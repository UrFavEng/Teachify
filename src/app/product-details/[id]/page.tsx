"use client";
import Breadcrumb from "@/components/Breadcrumb";
// import ProductApis from "@/utils/ProductApis";
import React from "react";
import HeaderProduct from "../_components/HeaderProduct";
import ProductList from "@/components/ProductList";
import {
  useGetAllProductsByCatQuery,
  useGetProductByIdQuery,
} from "@/app/store/apislice";
import Image from "next/image";
interface pageProps {
  params: { id: string };
}

const ProductPage = ({ params }: pageProps) => {
  const { data } = useGetProductByIdQuery({
    id: params.id,
  });
  const { data: dataProductsByCat } = useGetAllProductsByCatQuery({
    cat: data?.data.category,
  });

  return (
    <div>
      <div className=" container mx-auto my-10 px-4">
        {" "}
        {data && <Breadcrumb title={data?.data.title} />}
        {data && <HeaderProduct allProduct={data?.data} />}
        <div className=" py-8 mt-4">
          <h2 className=" text-primary font-bold mb-2 text-[28px] px-2">
            Similar products
          </h2>
          {dataProductsByCat && <ProductList course={dataProductsByCat.data} />}
        </div>{" "}
      </div>

      <div className="bg-white py-8 pt-[52px]">
        {" "}
        <div className="bg-bgPrimary w-[90%] mx-auto sm:w-auto sm:mx-auto flex-col sm:flex-row rounded-md px-6 sm:px-12 container border-2 flex items-center justify-between py-8 shadow-2xl mb-8 mt-2">
          <div className=" basis-[54%]">
            <h1 className=" text-[18px] lg:text-[24px] mb-1 md:mb-3 font-bold text-sec ">
              Unleash Your Potential: Invest in Knowledge Today!{" "}
            </h1>
            <p className=" w-[95%] leading-[18px] md:leading-[22px] sm:w-[85%] text-hoverColor font-medium text-[14px] lg:text-[18px] xl:text-[20px]">
              Invest in your future success and expand your knowledge horizons!
              Start your learning journey today by enrolling in courses to
              achieve both personal and professional growth.
            </p>
          </div>
          <div className=" w-[280px] mt-[28px] sm:mt-0 sm:w-auto sm:basis-[40%]">
            <Image alt="photo" src={"/detailed.svg"} width={370} height={370} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
