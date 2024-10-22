import React from "react";
interface VideoProps {
  url: string;
  setShowVideo: (val: boolean) => void;
}
const Video = ({ url, setShowVideo }: VideoProps) => {
  return (
    <div className="relative z-20 flex justify-center">
      <div
        className="fixed flex items-center justify-center inset-0 z-10 overflow-y-auto "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={() => setShowVideo(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup mx-4 px-4 md:px-8 pt-6 md:pb-4 relative z-30 bg-white shadow-xl  rounded-xl w-[400px] md:w-[680px] min-h-[100px]">
          <h3 className=" font-bold text-primary text-[18px] md:text-[28px]">
            Lecture
          </h3>
          <div className="mb-4 h-full">
            <video
              controls
              src={url}
              className="h-full  w-full m-auto mt-8 shadow-lg rounded-lg object-contain"
            />
          </div>
        </div>
      </div>{" "}
      <style>{`
  .popup {
    transform: translateY(-10%); /* تبدأ من خارج الشاشة */
    animation: slideDown 0.3s forwards;
  }

  @keyframes slideDown {
    to {
      transform: translateY(0); /* تتحرك لمكانها الطبيعي */
    }
  }
`}</style>
    </div>
  );
};

export default Video;
