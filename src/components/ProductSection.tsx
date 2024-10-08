"use client";
import React from "react";
import ProductList from "./ProductList";
import { useGetAllProductsQuery } from "@/app/store/apislice";
import { PulseLoader } from "react-spinners";

const ProductSection = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();
  console.log("data", data);
  return (
    <div id="LatestProducts" className=" container mx-auto py-8 px-4 ">
      <h1 className=" mb-6 text-[24px] font-bold text-primary">
        Our Latest Products
      </h1>
      {isLoading ? (
        <div className=" flex items-center justify-center h-[28vh]">
          {" "}
          <PulseLoader color="#3B4158" />
        </div>
      ) : (
        <>
          {" "}
          {isError ? (
            <p className=" h-[28vh]  font-bold text-[32px] flex items-center justify-center text-red-500">
              Internal Server Error
            </p>
          ) : (
            <> {data && <ProductList course={data?.data} />}</>
          )}
        </>
      )}
    </div>
  );
};

export default ProductSection;
