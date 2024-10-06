import React from "react";

const AboutUS = () => {
  return (
    <div className=" min-h-[78vh] flex items-center justify-center container mx-auto px-4 py-8">
      <div className="">
        {" "}
        <div className="collapse mt-4 bg-sec">
          <input
            title="AboutUs"
            type="radio"
            name="my-accordion-1"
            defaultChecked
          />
          <div className="collapse-title text-xl font-medium">
            {" "}
            <h1 className=" font-semibold  sm:text-[32px] text-[#f0f0f0]">
              Introduction:
            </h1>
          </div>
          <div className="collapse-content">
            <p className=" text-[14px] sm:text-[18px] leading-[20px] sm:leading-[24px] font-medium sm:font-semibold text-white w-[95%]">
              Welcome to{" "}
              <span className=" font-medium sm:font-bold text-[16px] sm:text-[24px] text-hoverColor">
                Teachify
              </span>
              , an online platform that simplifies the way users explore and
              purchase educational courses. The website offers a seamless
              experience with features such as a homepage, categorized sections,
              product details, search functionality, personal profiles, and a
              user-friendly login system. Built with modern technologies,
              Teachify is designed to provide an intuitive and engaging
              experience for learners seeking personal growth and knowledge.
            </p>
          </div>
        </div>
        <div className="collapse mt-4  bg-sec">
          <input title="AboutUs" type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            <h1 className=" font-semibold sm:text-[32px] text-[#f0f0f0]">
              Technologies Used:
            </h1>{" "}
          </div>
          <div className="collapse-content">
            <p className=" text-[14px] font-medium leading-[18px] sm:font-semibold text-[#f3f3f3]">
              Teachify is developed using cutting-edge web technologies to
              ensure both performance and scalability:
            </p>
            <div className=" text-[16px] sm:font-semibold text-shadowOrBorder w-[95%]">
              <ul className=" mt-1 text-white">
                <li className=" text-[14px] font-medium sm:text-[16px] leading-[22px] mt-1">
                  <span className=" font-semibold sm:font-bold  text-[18px] sm:text-[20px] text-hoverColor">
                    Next.js:{" "}
                  </span>{" "}
                  For server-side rendering and a fast, SEO-friendly frontend.
                </li>
                <li className=" text-[14px] font-medium sm:text-[16px] leading-[22px] mt-1">
                  {" "}
                  <span className=" font-semibold sm:font-bold text-[18px] sm:text-[20px] text-hoverColor">
                    TypeScript:
                  </span>{" "}
                  For robust and maintainable code with static typing.
                </li>
                <li className=" text-[14px] font-medium sm:text-[16px] leading-[22px] mt-1">
                  {" "}
                  <span className=" font-semibold sm:font-bold text-[18px] sm:text-[20px] text-hoverColor">
                    RTK Query:
                  </span>{" "}
                  To handle state management and API calls efficiently.
                </li>
                <li className=" text-[14px] font-medium sm:text-[16px] leading-[22px] mt-1">
                  {" "}
                  <span className=" font-semibold sm:font-bold text-[18px] sm:text-[20px] text-hoverColor">
                    Tailwind CSS:{" "}
                  </span>{" "}
                  For rapid UI development with responsive design and custom
                  styling.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="collapse mt-4 bg-sec">
          <input title="AboutUs" type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            <h1 className=" font-semibold sm:text-[32px] text-[#f0f0f0]">
              Goal:
            </h1>{" "}
          </div>
          <div className="collapse-content">
            <p className=" text-[14px] sm:text-[18px] leading-[20px] sm:leading-[24px] font-medium sm:font-semibold text-white w-[95%]">
              The main goal of Teachify is to create a platform that is not only
              functional but also elegant and professional, showcasing both
              technical and design skills. It’s meant to highlight my expertise
              in frontend development, backend integration, and overall project
              management, making it a standout project in my portfolio.
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
