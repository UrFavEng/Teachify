import { useEffect, useRef, useState } from "react";
import { RedirectToUserProfile, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useClerk } from "@clerk/clerk-react";
import { ChevronLeft, Menu } from "lucide-react";
import DropdownCat from "./DropdownCat";
import Link from "next/link";
import SearchInSM from "./SearchInSM";

export default function Dropdown() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(false);
  const { signOut } = useClerk();
  const dropdownRef = useRef<HTMLDivElement>(null);
  // console.log(user?.imageUrl);
  const handleLogout = async () => {
    await signOut();
  };

  // تأثير لإغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCate(false);

        setIsOpen(false); // إغلاق القائمة
      }
    };

    // إضافة المستمع للحدث عند النقر في أي مكان في الصفحة
    document.addEventListener("mousedown", handleClickOutside);

    // تنظيف المستمع عند فك الكومبوننت
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [showCate, setShowCate] = useState<boolean>(false);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        title="Menu"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 flex items-center justify-center p-2 text-sm  border border-transparent rounded-md  text-white hover:text-primary hover:bg-bgPrimary transition-all ease-in-out bg-sec"
      >
        <Menu className="  mt-1  " size={16} />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-20 w-[225px] sm:w-64 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
          <>
            {user && (
              <>
                <p className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <Image
                    width={100}
                    height={100}
                    src={user?.imageUrl as string}
                    className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                    alt="jane avatar"
                  />
                  <div className="mx-1">
                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {user?.fullName}
                    </h1>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </p>
                <hr className="border-gray-200 dark:border-gray-700" />
                <a
                  onClick={() => setView(true)}
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  View profile
                </a>
                <hr className="border-gray-200 dark:border-gray-700" />
                {view && <RedirectToUserProfile />}
              </>
            )}
            <Link
              onClick={() => setIsOpen(false)}
              href="/"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Home
            </Link>
            <p
              onClick={() => setShowCate(!showCate)}
              className="flex items-center relative px-4 py-3 text-sm cursor-pointer text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <ChevronLeft size={12} className=" mt-1 ml-[-12px]" /> Category
              {showCate && (
                <DropdownCat setShow={setShowCate} setIsOpen={setIsOpen} />
              )}
            </p>
            <p
              onClick={() => {
                setIsOpenSearch(true);
                setIsOpen(false);
              }}
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Search{" "}
            </p>
            <Link
              onClick={() => setIsOpen(false)}
              href="/about-us"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Contact US
            </Link>
            {user && (
              <>
                <hr className="border-gray-200 dark:border-gray-700" />
                <a
                  onClick={handleLogout}
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Sign Out
                </a>
              </>
            )}
          </>
        </div>
      )}{" "}
      {isOpenSearch && <SearchInSM setShow={setIsOpenSearch} />}
    </div>
  );
}
