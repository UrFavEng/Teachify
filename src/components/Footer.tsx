"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [logged, setLogged] = useState<boolean>(false);
  useEffect(() => {
    setLogged(window.location.href.toString().includes("sign-in"));
  }, []);

  return (
    !logged && (
      <footer className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link href={"/"} className=" flex gap-4 items-center">
              {" "}
              <Image
                src="/logo.svg" // Correct path
                alt="Logo"
                width={45}
                height={45}
              />{" "}
              <span className=" text-[24px] text-primary font-bold ">
                Dynamic
              </span>
            </Link>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
