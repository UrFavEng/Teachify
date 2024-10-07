"use client";
// import { CartContext } from "@/context/CartContext";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
// import CartAPIs from "@/utils/CartAPIs";
import { useGetUserCartQuery } from "@/app/store/apislice";
import Dropdown from "./Dropdown";
import DropdownCat from "./DropdownCat";
import ModalSearch from "./Search";
import NavBar from "./NavBar";

const Header = () => {
  const { user } = useUser();
  const [logged, setLogged] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showCate, setShowCate] = useState<boolean>(false);
  const { data } = useGetUserCartQuery({
    email: user?.primaryEmailAddress?.emailAddress,
  });
  // console.log(data, isError, isLoading);
  useEffect(() => {
    setLogged(window.location.href.toString().includes("sign-in"));
  }, []);
  useEffect(() => {
    if (data) {
      data.data.forEach((citem) => {
        console.log(citem);
      });
    }
  }, [user, data]);

  return (
    !logged && (
      <>
        {" "}
        <header className="bg-white  border-b-2 ">
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
                    <a
                      className="text-primary transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium"
                      href="#"
                    >
                      {" "}
                      Contact US
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  {user ? (
                    <div className=" items-center gap-4 flex">
                      <div className=" relative flex items-center gap-1 text-primary">
                        <ShoppingCart
                          onClick={() => setShowCart(!showCart)}
                          className=" text-sec hover:text-hoverColor transition-all cursor-pointer ease-in-out"
                        />{" "}
                        ({data?.data.length})
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
    )
  );
};

export default Header;
