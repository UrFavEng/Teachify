"use client";
import { useGetCategoriesQuery } from "@/app/store/apislice";
import React from "react";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

const NavBar = () => {
  const router = useRouter();

  const { data, isLoading, isFetching } = useGetCategoriesQuery();
  console.log(data);
  return (
    <div className="bg-white  px-4  w-full scroll-hidden shadow-shadowOrBorder relative z-10 gap-4 shadow-2xl hidden sm:flex items-center justify-start lg:justify-center pt-2 pb-[10px] overflow-x-auto whitespace-nowrap">
      {isLoading && isFetching ? (
        <>
          <PulseLoader color="#3B4158" size={10} className="text-center" />
        </>
      ) : (
        <>
          {data?.data.map((cat) => (
            <p
              onClick={() =>
                router.push("/category/" + cat?.title.toLowerCase())
              }
              key={cat.documentId}
              className="capitalize text-[14px] hover:underline lg:text-[16px] font-medium lg:font-semibold text-primary hover:text-hoverColor transition ease-in-out cursor-pointer inline-block"
            >
              {cat?.title.toLowerCase()}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default NavBar;
