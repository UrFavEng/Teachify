"use client";
import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from "react";
import {
  useGetAllOrdersUserQuery,
  useMyLearningCoursesQuery,
} from "../store/apislice";
import { useUser } from "@clerk/nextjs";
import { OrdersUserRes } from "../store/types";
import Image from "next/image";
import { Link, MonitorDot } from "lucide-react";
import Video from "@/components/Video";
function getAllProductDocumentIds(response: OrdersUserRes) {
  // إنشاء مصفوفة لتخزين كل documentId الخاص بالمنتجات
  const productDocumentIds: string[] = [];

  // التحقق من وجود البيانات في الاستجابة
  if (response?.data?.length > 0) {
    // التنقل عبر كل order في الاستجابة
    response.data.forEach((order) => {
      // التحقق من وجود منتجات في order الحالي
      if (order.products && order.products.length > 0) {
        // جمع كل documentId الخاص بالمنتجات في order
        order.products.forEach((product) => {
          productDocumentIds.push(product.documentId);
        });
      }
    });
  }

  // إعادة مصفوفة documentId التي تم جمعها
  return productDocumentIds;
}
const MyLearning = () => {
  const { user } = useUser();
  const { data: ordersUser } = useGetAllOrdersUserQuery(
    user?.primaryEmailAddress?.emailAddress as string
  );
  const [ordersUsers, setOrdersUsers] = useState<string[]>([]);
  useEffect(() => {
    if (ordersUser) {
      setOrdersUsers(getAllProductDocumentIds(ordersUser as OrdersUserRes));
    }
  }, [ordersUser]);
  const { data } = useMyLearningCoursesQuery(ordersUsers);
  console.log(data);
  const [showVideo, setShowVideo] = useState<boolean>();
  return (
    <div className=" container px-4 mx-auto min-h-[76vh] py-8">
      <h1 className=" font-bold text-primary text-[26px] capitalize ">
        <Breadcrumb title={"Your Courses"} />
      </h1>
      {data?.data.map((item) => (
        <div
          className=" border-b-2 border-black pb-12 my-4 flex items-start flex-col  justify-between"
          key={item.documentId}
        >
          <div className=" flex-col md:flex-row   flex items-start justify-start gap-4  w-full xl:basis-[30%] mb-4 xl:mb-0 h-full">
            <Image
              src={item.banner.url}
              className=" rounded-lg w-full md:w-[400px]  xl:w-[480px] shadow-lg object-contain"
              alt="photo"
              width={400}
              height={400}
            />
            <div className=" md:w-[500px]">
              <h1 className=" w-full text-[24px] font-medium capitalize text-primary">
                {item.title}
              </h1>
              <p className=" mt-[-6px] font-medium text-hoverColor">
                {item.category.title}
              </p>
              <h3 className=" text-sec font-semibold">What&apos;s included</h3>
              {item?.Included?.map((e) => (
                <p
                  key={e}
                  className=" my-1 flex items-center gap-1 text-[14px] font-medium text-sec"
                >
                  <MonitorDot size={14} className=" mt-[3px]" />
                  {e}
                </p>
              ))}
            </div>
          </div>
          <p className="my-4 font-medium text-[13px] leading-[15px] md:leading-normal md:text-[15px] text-sec">
            <span className=" text-[16px] font-bold text-[#464646] ">
              Description:
            </span>{" "}
            {item.description}
          </p>
          <div className="join basis-[68%] join-vertical  bg-shadowOrBorder w-full">
            {item.files?.map((lec, index) => (
              <div
                key={lec.documentId}
                className="collapse collapse-arrow join-item border-base-300 border"
              >
                {showVideo && (
                  <Video url={lec.url} setShowVideo={setShowVideo} />
                )}
                <input
                  title={lec.documentId}
                  type="radio"
                  name="my-accordion-4"
                  defaultChecked
                />
                <div className="collapse-title  text-primary text-xl font-medium">
                  Lecture {index + 1}
                </div>
                <div className="collapse-content">
                  <button
                    onClick={() => setShowVideo(true)}
                    className=" text-sec hover:underline flex items-center gap-1"
                  >
                    <Link size={14} className=" mt-[2px]" /> Click to show
                    lecture
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyLearning;
