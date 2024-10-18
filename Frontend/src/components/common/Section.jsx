import React from "react";

function Section({children, className=""}) {
  return (
    // <div className="mx-auto w-[100%] cursor-default border-gray-100 rounded-lg shadow-xs border-2 my-3 p-4 pb-0 bg-linkedinWhite">
    //   {children}
    // </div>
    <div
      className={`bg-white rounded-lg mt-3  w-4/5 md:w-1/2 mx-auto p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export default Section;
