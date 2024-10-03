import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl  text-hoverColor">
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

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block transition-all ease-in-out w-full rounded bg-primary px-12 py-3 text-sm font-medium text-bgPrimary shadow  focus:outline-none  hover:bg-hoverColor hover:text-primary sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block transition-all ease-in-out w-full rounded px-12 py-3 text-sm font-medium text-primary bg-bgPrimary shadow  focus:outline-none hover:bg-primary hover:text-bgPrimary sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
