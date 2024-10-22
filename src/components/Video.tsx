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
        <div className="popup mx-4 px-8 pt-6 pb-4 relative z-30 bg-white shadow-xl  rounded-xl w-[780px] min-h-[500px] border-2 border-b-0 border-t-0 border-r-0 border-primaryDark">
          <h3 className=" font-bold text-primary text-[28px]">Lecture</h3>
          <div className="mb-8   h-full">
            <video
              width={800}
              height={800}
              controls
              src={url}
              className="h-full  m-auto mt-8 shadow-lg rounded-lg object-contain"
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