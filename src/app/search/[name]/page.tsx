"use client";
import { useSearchProductsQuery } from "@/app/store/apislice";
import Breadcrumb from "@/components/Breadcrumb";
import ProductList from "@/components/ProductList";
import React from "react";
interface PageProps {
  params: { name: string };
}
const Page = ({ params }: PageProps) => {
  const { data } = useSearchProductsQuery(params.name, {
    skip: !params.name,
  });
  console.log(data);
  return (
    <div className=" min-h-[78vh] container mx-auto px-4">
      <div className=" mt-8">
        {" "}
        <Breadcrumb title={params.name} />
      </div>
      <div className=" mt-8">
        <ProductList course={data?.data} />
      </div>
    </div>
  );
};

export default Page;
