import { useEffect, useRef, useState } from "react";
import { RedirectToUserProfile, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useClerk } from "@clerk/clerk-react";
import { Menu } from "lucide-react";

export default function Dropdown() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(false);
  const { signOut } = useClerk();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div className="absolute right-0 z-20 w-[225px] sm:w-64 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
          <>
            {user && (
              <>
                <a
                  href="#"
                  className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
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
                </a>
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
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Explore
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Projects
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              About Us
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Contact US
            </a>
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
      )}
    </div>
  );
}
