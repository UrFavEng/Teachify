"use client";

import { useGetReviewsByProductIdQuery } from "@/app/store/apislice";
import React from "react";
import ReviewCard from "./ReviewCard";
interface pageProps {
  id: string;
}
const Reviews = ({ id }: pageProps) => {
  const { data } = useGetReviewsByProductIdQuery({
    productId: id,
  });
  console.log(data);
  return (
    <div className=" px-4 shadow-sm rounded-md py-4 container bg-white mx-auto ">
      <h1 className=" text-primary font-medium mb-4 text-[28px] text-center">
        Reviews
      </h1>
      {data?.data && (
        <>
          {" "}
          {data?.data.map(
            (e: {
              documentId: string;
              comment: string;
              createdAt: string;
              id: number;
              imgUrl: string;
              locale: null;
              publishedAt: string;
              rating: number;
              updatedAt: string;
              userId: string;
              userName: string;
            }) => (
              <ReviewCard item={e} key={e.documentId} />
            )
          )}
        </>
      )}
    </div>
  );
};

export default Reviews;