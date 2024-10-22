"use client";
// import { CartContext } from "@/context/CartContext";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronDown, Library, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cart from "./Cart";
import { useRouter } from "next/navigation";
import {
  useGetAllOrdersUserQuery,
  useGetUserCartQuery,
} from "@/app/store/apislice";
import Dropdown from "./Dropdown";
import DropdownCat from "./DropdownCat";
import ModalSearch from "./Search";
import NavBar from "./NavBar";
import { PulseLoader } from "react-spinners";

const Header = () => {
  const router = useRouter();

  const { user } = useUser();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showCate, setShowCate] = useState<boolean>(false);
  const { data, isLoading, isFetching } = useGetUserCartQuery(
    {
      email: user?.primaryEmailAddress?.emailAddress,
    },
    {
      skip: !user?.primaryEmailAddress?.emailAddress,
    }
  );
  const { data: ordersUser } = useGetAllOrdersUserQuery(
    user?.primaryEmailAddress?.emailAddress as string
  );
  return (
    <>
      {" "}
      <header className="bg-white  border-b-[1px] ">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link href={"/"}>
            {" "}
            <Image
              src="/logo.svg" // Correct path
              alt="Logo"
              width={45}
              height={45}
            />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-primary transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <p
                    className="text-primary cursor-pointer  flex items-center justify-center transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium"
                    onClick={() => setShowCate(!showCate)}
                  >
                    {" "}
                    Category <ChevronDown size={16} className=" mt-1" />
                  </p>
                  {showCate && <DropdownCat setShow={setShowCate} />}
                </li>

                <li>
                  <div className="text-primary cursor-pointer transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium">
                    <ModalSearch />
                  </div>
                </li>

                <li>
                  <Link
                    className="text-primary transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium"
                    href="/about-us"
                  >
                    {" "}
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-primary transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium"
                    href="/contact-us"
                  >
                    {" "}
                    Contact US
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {user ? (
                  <div className=" items-center gap-4 flex">
                    <div className=" relative flex items-center gap-1 text-primary">
                      {isLoading && isFetching ? (
                        <>
                          <PulseLoader size={8} color="#3B4158" />
                        </>
                      ) : (
                        <>
                          <span
                            onClick={() => setShowCart(!showCart)}
                            className="text-sec hover:text-hoverColor transition-all cursor-pointer ease-in-out  flex gap-1 items-center"
                          >
                            {" "}
                            <ShoppingCart className="" /> ({data?.data.length})
                          </span>{" "}
                          |{" "}
                          <span
                            onClick={() => router.push("/mylearning")}
                            className="text-primary hover:text-shadowOrBorder  transition-all cursor-pointer ease-in-out  flex gap-1 items-center"
                          >
                            {" "}
                            <Library className="" />({ordersUser?.data.length})
                          </span>
                        </>
                      )}

                      {showCart && (
                        <>
                          <Cart setShow={setShowCart} />
                        </>
                      )}
                    </div>
                    <div className=" hidden mt-[10px] md:block">
                      {" "}
                      <UserButton afterSwitchSessionUrl="/" />
                    </div>
                  </div>
                ) : (
                  <>
                    <a
                      className="block rounded-md transition-all ease-in-out bg-primary px-[18px] py-[8px]  text-[14px] sm:text-[16px] font-medium text-bgPrimary  hover:bg-hoverColor hover:text-primary"
                      href="/sign-in"
                    >
                      Login
                    </a>
                  </>
                )}
                {}
              </div>
              <div className=" md:hidden">
                <Dropdown />
              </div>
              {/* <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </header>
      <NavBar />
    </>
  );
};

export default Header;
