"use client";
import { CartContext } from "@/context/CartContext";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import CartAPIs from "@/utils/CartAPIs";

const Header = () => {
  const { cart, setCart } = useContext(CartContext);
  const [logged, setLogged] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  useEffect(() => {
    setLogged(window.location.href.toString().includes("sign-in"));
  }, []);
  const { user } = useUser();
  useEffect(() => {
    getCartItems();
  }, [user]);
  const getCartItems = () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      CartAPIs.getUserCartItems(user?.primaryEmailAddress?.emailAddress).then(
        (res) => {
          res.data.data.forEach((citem) => {
            setCart((old) => [...old, { id: citem.id, product: citem }]);
          });
          console.log(res.data.data);
        }
      );
    }
  };
  console.log(cart);
  return (
    !logged && (
      <header className="bg-white shadow-sm shadow-shadowOrBorder">
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
                  <a
                    className="text-primary transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium"
                    href="#"
                  >
                    {" "}
                    Explore
                  </a>
                </li>

                <li>
                  <a
                    className="text-primary transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium"
                    href="#"
                  >
                    {" "}
                    Projects
                  </a>
                </li>

                <li>
                  <a
                    className="text-primary transition-all ease-in-out hover:text-hoverColor text-[15px] font-medium"
                    href="#"
                  >
                    {" "}
                    About Us
                  </a>
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
                      ({cart?.length})
                      {showCart && <Cart setShow={setShowCart} />}
                    </div>
                    <UserButton afterSwitchSessionUrl="/" />
                  </div>
                ) : (
                  <>
                    <a
                      className="block rounded-md transition-all ease-in-out bg-primary px-[18px] py-[8px] text-[16px] font-medium text-bgPrimary  hover:bg-hoverColor hover:text-primary"
                      href="/sign-in"
                    >
                      Login
                    </a>

                    <a
                      className="block rounded-md transition-all ease-in-out text-primary px-[18px] py-[8px] text-[16px] font-medium bg-bgPrimary  hover:bg-primary hover:text-bgPrimary"
                      href=""
                    >
                      Register
                    </a>
                  </>
                )}
                {}
              </div>

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
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
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
