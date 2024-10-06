import React from "react";

const AboutUS = () => {
  return (
    <div className=" min-h-[78vh] container mx-auto px-4 py-8">
      <div className=" mt-6">
        {" "}
        <h1 className=" font-semibold text-[32px] text-primary">
          Introduction:
        </h1>
        <p className=" text-[18px] font-semibold text-primary w-[95%]">
          Welcome to{" "}
          <span className=" font-bold text-[24px] text-hoverColor">
            Teachify
          </span>
          , an online platform that simplifies the way users explore and
          purchase educational courses. The website offers a seamless experience
          with features such as a homepage, categorized sections, product
          details, search functionality, personal profiles, and a user-friendly
          login system. Built with modern technologies, Teachify is designed to
          provide an intuitive and engaging experience for learners seeking
          personal growth and knowledge.
        </p>
      </div>
      <div className=" mt-6">
        {" "}
        <h1 className=" font-semibold text-[32px] text-primary">
          Technologies Used:
        </h1>
        <p className=" text-[14px] font-bold text-[#777]">
          Teachify is developed using cutting-edge web technologies to ensure
          both performance and scalability:
        </p>
        <p className=" text-[18px] font-semibold text-primary w-[95%]">
          <ul className=" mt-1">
            <li>
              <span className=" font-bold text-[20px] text-hoverColor">
                Next.js:
              </span>{" "}
              For server-side rendering and a fast, SEO-friendly frontend.
            </li>
            <li>
              {" "}
              <span className=" font-bold text-[20px] text-hoverColor">
                TypeScript:
              </span>{" "}
              For robust and maintainable code with static typing.
            </li>
            <li>
              {" "}
              <span className=" font-bold text-[20px] text-hoverColor">
                RTK Query:
              </span>{" "}
              To handle state management and API calls efficiently.
            </li>
            <li>
              {" "}
              <span className=" font-bold text-[20px] text-hoverColor">
                Tailwind CSS:{" "}
              </span>{" "}
              For rapid UI development with responsive design and custom
              styling.
            </li>
          </ul>
        </p>
      </div>
      <div className=" mt-6">
        {" "}
        <h1 className=" font-semibold text-[32px] text-primary">Goal:</h1>{" "}
        <p className=" text-[18px] font-semibold text-primary w-[95%]">
          The main goal of Teachify is to create a platform that is not only
          functional but also elegant and professional, showcasing both
          technical and design skills. It’s meant to highlight my expertise in
          frontend development, backend integration, and overall project
          management, making it a standout project in my portfolio.
        </p>
      </div>
    </div>
  );
};

export default AboutUS;
