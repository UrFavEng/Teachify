import { useGetAllCatQuery } from "@/app/store/apislice";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
interface CartProps {
  setShow: (val: boolean) => void;
  setIsOpen?: (val: boolean) => void;
}
const DropdownCat = ({ setShow, setIsOpen }: CartProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false); // إغلاق القائمة
      }
    };

    // إضافة المستمع للحدث عند النقر في أي مكان في الصفحة
    document.addEventListener("mousedown", handleClickOutside);

    // تنظيف المستمع عند فك الكومبوننت
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { data } = useGetAllCatQuery();
  const uniqueCategories = Array.from(
    new Set(data?.data?.map((product) => product.category) || [])
  );

  console.log(uniqueCategories);
  return (
    <div className="relative z-20 " ref={dropdownRef}>
      <div
        className="absolute end-0 popup mt-[-20px] md:top-0 right-[70px] md:right-[-50px] z-10 md:mt-4 w-[130px] sm:w-56 rounded-md md:border md:border-gray-100 bg-primary md:bg-white shadow-lg"
        role="menu"
      >
        <div className="p-2">
          {uniqueCategories.map((cat) => (
            <Link
              onClick={() => {
                setShow(false);
                if (setIsOpen) {
                  setIsOpen(false);
                }
              }}
              href={"/category/" + cat.toLowerCase()}
              key={cat}
              className="block rounded-lg text-[13px]  capitalize sm:text-[16px] px-2 sm:px-4 py-1 sm:py-2 font-medium text-white md:text-primary hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              {cat.toLowerCase()}
            </Link>
          ))}
        </div>
      </div>{" "}
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

export default DropdownCat;
