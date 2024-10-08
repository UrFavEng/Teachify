"use client";
import { useGetCategoriesQuery } from "@/app/store/apislice";
import React from "react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const { data } = useGetCategoriesQuery();
  console.log(data);

  return (
    <div className=" bg-white     shadow-shadowOrBorder  relative z-10 gap-4 shadow-2xl hidden sm:flex items-center justify-center pt-2 pb-[10px] ">
      {data?.data.map((cat) => (
        <p
          onClick={() => router.push("/category/" + cat?.title.toLowerCase())}
          key={cat.documentId}
          className=" capitalize text-[13px] lg:text-[16px] font-medium lg:font-semibold text-primary hover:text-hoverColor transition ease-in-out cursor-pointer"
        >
          {cat?.title.toLowerCase()}
        </p>
      ))}
    </div>
  );
};

export default NavBar;
