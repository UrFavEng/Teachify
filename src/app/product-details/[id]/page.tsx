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
    <div className=" container mx-auto my-10 px-4">
      {data && <Breadcrumb title={data?.data.title} />}
      {data && <HeaderProduct allProduct={data?.data} />}
      <div className=" py-8 mt-4">
        <h2 className=" text-primary font-bold mb-2 text-[28px] px-2">
          Similar products
        </h2>
        {dataProductsByCat && <ProductList course={dataProductsByCat.data} />}
      </div>
    </div>
  );
};

export default ProductPage;
