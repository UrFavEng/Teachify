"use client";
import { useGetAllCatQuery } from "@/app/store/apislice";
import React from "react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const { data } = useGetAllCatQuery();
  const uniqueCategories = Array.from(
    new Set(data?.data?.map((product) => product.category) || [])
  );

  return (
    <div className=" bg-white     shadow-shadowOrBorder  relative z-10 gap-4 shadow-2xl hidden sm:flex items-center justify-center pt-2 pb-[10px] ">
      {uniqueCategories.map((cat) => (
        <p
          onClick={() => router.push("/category/" + cat.toLowerCase())}
          key={cat}
          className=" capitalize text-[16px] font-semibold text-primary hover:text-hoverColor transition ease-in-out cursor-pointer"
        >
          {cat.toLowerCase()}
        </p>
      ))}
    </div>
  );
};

export default NavBar;
