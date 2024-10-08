"use client";
import Breadcrumb from "@/components/Breadcrumb";
// import ProductApis from "@/utils/ProductApis";
import React, { useState } from "react";
import HeaderProduct from "../_components/HeaderProduct";
import ProductList from "@/components/ProductList";
import {
  useAddReviewMutation,
  useGetAllProductsByCatQuery,
  useGetProductByIdQuery,
} from "@/app/store/apislice";
import Image from "next/image";
import Reviews from "@/components/Reviews";
import { Rating } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useUser } from "@clerk/nextjs";
import { ArrowDownWideNarrow } from "lucide-react";

interface pageProps {
  params: { id: string };
}
export interface ReviewREQ {
  comment: string;
  rate: number | null;
  bookId: string | undefined | null | number;
}
const ProductPage = ({ params }: pageProps) => {
  const { user } = useUser();
  const [price, setPrice] = useState("asc");

  const [value, setValue] = useState<number | null>(null);
  const [errRate, setErrRate] = useState<string>("");
  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const { data } = useGetProductByIdQuery({
    id: params.id,
  });
  const { data: dataProductsByCat } = useGetAllProductsByCatQuery({
    cat: data?.data.category.title,
    price,
  });
  console.log("dataProductsByCat", dataProductsByCat);
  const [postReview] = useAddReviewMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ReviewREQ>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<ReviewREQ> = (data, event) => {
    if (user) {
      setErrRate("");
      const newReview = {
        data: {
          rating: value,
          comment: data.comment,
          product: params.id,
          userName: user?.fullName,
          userId: user?.id,
          imgUrl: user?.imageUrl,
        },
      };
      if (value !== null) {
        postReview(newReview)
          .unwrap()
          .then(() => {
            // console.log(fulfilled);
            reset();
            setValue(null);
            handleSuccess();
          })
          .catch((rejected) => {
            console.log(rejected.status);
            if (rejected.status == 400) {
              Swal.fire({
                position: "center",
                icon: "info",
                title: "You have already provided a comment and a rating",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      } else {
        setErrRate("You Forget The Rate");
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You must login!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <div className=" container mx-auto my-10 px-4">
        {" "}
        {data && <Breadcrumb title={data?.data.title} />}
        {data && <HeaderProduct allProduct={data?.data} />}
        {data && <Reviews id={params.id} />}{" "}
        <div className=" container mx-auto  my-6 rounded-md hover:shadow-md transition px-4 py-4 bg-white">
          {false ? (
            <h3 className=" text-[18px] font-medium text-teal-700">
              You have already provided a comment and a rating
            </h3>
          ) : (
            <>
              <h1 className=" mb-2 text-primary font-semibold text-[22px]">
                Add Review
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className=" mb-4  flex-col sm:flex-row flex items-center justify-start gap-3">
                  <div className=" w-full sm:w-[80%]">
                    {" "}
                    <input
                      {...register("comment", {
                        required: "comment is required",
                      })}
                      className=" rounded-lg outline-none w-full text-primary font-medium text-[18px] h-12 pl-4 bg-bgPrimary shadow-md border-shadowOrBorder border-[1px]"
                      type="text"
                      placeholder="Add Review"
                    />
                  </div>
                  <div>
                    {" "}
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>
                </div>{" "}
                <p className=" font-medium text-red-500 mb-3">
                  {errors.comment?.message}
                </p>
                <p className=" font-medium text-red-500 mb-3">{errRate}</p>
                {false ? (
                  <PulseLoader color="#3B4158" />
                ) : (
                  <input
                    type="submit"
                    value="Add"
                    className="block cursor-pointer shadow-2xl rounded-md transition-all ease-in-out bg-primary px-[18px] py-[8px]  text-[14px] sm:text-[16px] font-medium text-bgPrimary  hover:bg-hoverColor hover:text-primary"
                  />
                )}
              </form>
            </>
          )}
        </div>
        <div className=" py-8 mt-4">
          <h2 className=" text-primary font-bold mb-2 text-[28px] px-2">
            Similar products
          </h2>{" "}
          <div className=" mt-[-8px] pl-1 ">
            <p
              onClick={() =>
                price === "asc" ? setPrice("desc") : setPrice("asc")
              }
              className=" cursor-pointer text-primary font-medium  text-[16px] flex items-end gap-1"
            >
              Price <ArrowDownWideNarrow size={18} className=" text-primary" />{" "}
            </p>
          </div>
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
