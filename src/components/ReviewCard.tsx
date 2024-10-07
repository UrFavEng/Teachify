import { useUser } from "@clerk/nextjs";
import { Rating } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import PopUpEditReview from "./PopUpEditReview";
import { useDeleteReviewMutation } from "@/app/store/apislice";
import Swal from "sweetalert2";

const ReviewCard = (item: {
  item: {
    comment: string;
    createdAt: string;
    documentId: string;
    id: number;
    imgUrl: string;
    locale: null;
    publishedAt: string;
    rating: number;
    updatedAt: string;
    userId: string;
    userName: string;
  };
}) => {
  const { user } = useUser();
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [deleteReview] = useDeleteReviewMutation();
  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleDelete = () => {
    deleteReview(item?.item?.documentId)
      .unwrap()
      .then((fulfilled) => {
        handleSuccess();
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
        if (rejected.status == 404) {
          Swal.fire("This's review isn't exist");
        } else if (rejected.status == 500) {
          Swal.fire("Server error");
        }
      });
  };
  function formatDate(dateString: string | undefined): string {
    if (dateString) {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
    }
    return "Undefined";
  }
  return (
    <div>
      {" "}
      <div className="flex flex-col gap-4 my-2">
        <div className="justify-center gap-4 flex  items-start relative group">
          <div>
            <Image
              width={65}
              height={65}
              src={item.item.imgUrl}
              alt=""
              className="aspect-square rounded-full"
            />
          </div>
          <div className="bg-[#f1f1f1] rounded-md py-1 px-4 w-[90%] relative">
            <h1 className="flex justify-between items-center">
              <span className="text-[14px] sm:text-[18px] capitalize font-medium text-hoverColor">
                {item?.item?.userName}
              </span>
              <span className="text-[10px] flex items-center gap-1 flex-row-reverse text-sec sm:text-[12px]">
                {formatDate(item?.item?.updatedAt)}
                <span className="cursor-pointer text-[18px] text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {user?.id == item?.item?.userId && (
                    <Trash2
                      size={16}
                      className=" text-red-500"
                      onClick={() => handleDelete()}
                    />
                  )}
                </span>
              </span>
            </h1>
            <div className="ml-[-2px]">
              <Rating
                name="read-only"
                value={item.item.rating}
                readOnly
                size="small"
              />
            </div>
            <p className="font-medium flex justify-between items-center text-gray-900">
              <span className="text-[14px] sm:text-[16px] flex items-center gap-1">
                {item?.item.comment}{" "}
                {user?.id == item?.item?.userId && (
                  <span className="cursor-pointer sm:text-[18px] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Pencil
                      size={14}
                      className=" mt-1"
                      onClick={() => setShowPopUp(true)}
                    />
                  </span>
                )}
              </span>
            </p>
            {/* <p className="font-medium text-teal-600">{"errEditReview"}</p> */}
          </div>
        </div>
      </div>{" "}
      {showPopUp && (
        <PopUpEditReview setShowPopUp={setShowPopUp} item={item.item} />
      )}
    </div>
  );
};

export default ReviewCard;
