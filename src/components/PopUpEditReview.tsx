"use client";
import { useUpdateReviewMutation } from "@/app/store/apislice";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";

interface PopUpEditReviewProps {
  setShowPopUp: (val: boolean) => void;
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
}
const PopUpEditReview = ({ setShowPopUp, item }: PopUpEditReviewProps) => {
  const [updateReview, { isLoading }] = useUpdateReviewMutation();
  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const [rate, setrate] = useState<number>(0);
  const [comment, setcomment] = useState<string>("");
  useEffect(() => {
    setcomment(item?.comment);
    setrate(item?.rating);
  }, [item]);
  const HandleEdit = () => {
    const review = { data: { rating: rate, comment } };
    updateReview({ review, id: item.documentId })
      .unwrap()
      .then((fulfilled) => {
        handleSuccess();
        setShowPopUp(false);
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
  return (
    <div className="relative z-20 flex justify-center">
      <button className="text-primary flex items-center justify-center gap-1 cursor-pointer transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium">
        Search
      </button>

      {true && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto popup"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={() => setShowPopUp(false)}
            className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
          ></div>
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative cursor-default inline-block px-3 pt-4 pb-3 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:align-middle">
              <div className="bg-white p-4 rounded-md max-w-md w-full ">
                <h2 className="text-lg font-medium mb-2 text-gray-900">
                  Edit Review
                </h2>
                <input
                  placeholder="Comment"
                  className=" rounded-lg outline-none w-full text-primary font-medium text-[18px] h-10 mb-2 pl-4 bg-bgPrimary shadow-md border-shadowOrBorder border-[1px]"
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                />
                <div className="mb-4">
                  <Rating
                    name="edit-rating"
                    value={rate}
                    onChange={(event, newValue) => setrate(newValue ?? 0)}
                  />
                </div>
                <div className="gap-2 flex items-center">
                  {isLoading ? (
                    <>
                      <PulseLoader color="#3B4158" size={10} />
                    </>
                  ) : (
                    <>
                      {" "}
                      <button
                        onClick={() => HandleEdit()}
                        className="cursor-pointer shadow-2xl rounded-md transition-all ease-in-out bg-primary px-[18px] py-[8px]  text-[14px] sm:text-[16px] font-medium text-bgPrimary  hover:bg-hoverColor hover:text-primary"
                      >
                        Save
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setShowPopUp(false)}
                    className="bg-gray-400 hover:bg-gray-300 text-gray-900 py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .popup {
          transform: translateY(-1%); /* تبدأ من خارج الشاشة */
          animation: slideDown 0.3s forwards;
        }
      
        @keyframes slideDown {
          to {
            transform: translateY(0); /* تتحرك لمكانها الطبيعي */
          }
        }
      `}</style>
    </div>
  );
};

export default PopUpEditReview;
