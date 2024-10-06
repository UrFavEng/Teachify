"use client";
import { useGetAllProductsByCatQuery } from "@/app/store/apislice";
import Breadcrumb from "@/components/Breadcrumb";
import ProductList from "@/components/ProductList";
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
    <div className=" container px-4 mx-auto min-h-[78vh] py-8">
      <h1 className=" font-bold text-primary text-[26px] capitalize ">
        <Breadcrumb title={params.cat} />
      </h1>
      <div className=" mt-4">
        {dataProductsByCat && <ProductList course={dataProductsByCat.data} />}
      </div>
    </div>
  );
};

export default Page;
