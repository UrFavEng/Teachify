import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-50 ">
      <div className="mx-auto px-4 gap-6 xl:gap-12 py-12 md:py-16 lg:py-24 xl:py-32 lg:flex lg:h-[80vh] lg:items-center flex flex-col-reverse lg:flex-row items-center justify-around">
        <div className=" max-w-xl">
          <h1 className="text-3xl font-extrabold lg:text-4xl xl:text-5xl  text-hoverColor">
            Master New Skills with
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Expert-Led Courses.
            </strong>
          </h1>

          <p className="mt-3 text-hoverColor leading-6 font-medium ">
            Learn online at your convenience and accelerate your career growth
            with industry-relevant content.
          </p>

          <div className="mt-8 flex flex-wrap justify-start gap-4">
            <a
              className="block transition-all ease-in-out w-full rounded bg-primary px-12 py-3 text-sm font-medium text-bgPrimary shadow  focus:outline-none  hover:bg-hoverColor hover:text-primary sm:w-auto"
              href="#LatestProducts"
            >
              Get Started
            </a>

            <Link
              className="block transition-all ease-in-out w-full rounded px-12 py-3 text-sm font-medium text-primary bg-bgPrimary shadow  focus:outline-none hover:bg-primary hover:text-bgPrimary sm:w-auto"
              href="/about-us"
            >
              About us
            </Link>
          </div>
        </div>{" "}
        <div>
          <Image alt="photo" width={400} height={400} src={"/landing.svg"} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
