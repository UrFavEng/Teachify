import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Dynamic",
  description: "Generated by create next app",
};
export default function Home() {
  return (
    <div>
      <Hero />
      <ProductSection />
      <div className="bg-white py-8 pt-[52px]">
        {" "}
        <div className="container mx-auto py-8 px-4 bg-bgPrimary w-[90%]  sm:w-auto sm:mx-auto flex-col sm:flex-row rounded-md  sm:px-12  border-2 flex items-center justify-between  shadow-2xl mb-8 mt-2">
          <div className=" basis-[54%]">
            <h1 className=" text-[18px] lg:text-[24px] mb-1 md:mb-3 font-bold text-sec ">
              Take the leap, enroll today!
            </h1>
            <p className=" w-[95%] leading-[18px] md:leading-[22px] sm:w-[85%] text-hoverColor font-medium text-[14px] lg:text-[18px] xl:text-[20px]">
              Discover the endless possibilities that await you and embark on a
              transformative journey of self-improvement today by investing in
              this exceptional course.
            </p>
          </div>
          <div className=" w-[280px] mt-[28px] sm:mt-0 sm:w-auto sm:basis-[40%]">
            <Image alt="photo" src={"/learning.svg"} width={400} height={400} />
          </div>
        </div>
      </div>
    </div>
  );
}
