import React from "react";
import { ImSpinner2 } from "react-icons/im";

export const Loading = () => {
  return (
    <div className="flex place-content-center place-items-center min-h-[50vh] w-full">
      <ImSpinner2 size={50} color="#fff" className="animate-spin" />
    </div>
  );
};
