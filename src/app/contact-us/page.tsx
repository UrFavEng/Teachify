"use client";
import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Swal from "sweetalert2";

const Page = () => {
  const { user } = useUser();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Still under development",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You must login!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className=" min-h-[75vh] flex items-center justify-center">
      <section className="relative flex flex-col gap-12 md:flex-row  items-center justify-between container mx-4 sm:mx-auto">
        <div className="">
          <div className="mx-auto max-w-lg">
            <h1 className="text-2xl mt-12 font-bold text-primary sm:text-3xl">
              Contact us.
            </h1>

            <p className="mt-[4px] text-[14px] leading-[18px] text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form onSubmit={handleSubmit} className=" flex flex-col gap-4 mt-8">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  required
                  type="email"
                  className=" rounded-lg outline-none w-full text-primary font-medium text-[18px] h-12 pl-4 bg-bgPrimary shadow-2xl border-shadowOrBorder border-[1px]"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Content
              </label>

              <div className="relative">
                <textarea
                  required
                  id="Content"
                  className=" resize-none rounded-lg outline-none w-full text-primary font-medium text-[18px] pt-2 h-[164px] pl-4 bg-bgPrimary shadow-2xl border-shadowOrBorder border-[1px]"
                  placeholder="Content"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="block shadow-2xl rounded-md transition-all ease-in-out bg-primary px-[18px] py-[8px]  text-[14px] sm:text-[16px] font-medium text-bgPrimary  hover:bg-hoverColor hover:text-primary"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="">
          <Image alt="photo" width={400} height={400} src={"/mailbox.svg"} />
        </div>
      </section>
    </div>
  );
};

export default Page;
