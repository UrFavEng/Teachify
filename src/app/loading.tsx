import React from "react";
import { PulseLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="  flex items-center justify-center min-h-[50vh]">
      <PulseLoader color="#3B4158" />
    </div>
  );
};

export default loading;
