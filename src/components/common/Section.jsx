import React from "react";

function Section({children}) {
  return (
    // <div className="mx-auto w-[100%] cursor-default border-gray-100 rounded-lg shadow-xs border-2 my-3 p-4 pb-0 bg-linkedinWhite">
    //   {children}
    // </div>
    <div className="bg-white rounded-lg mt-3 w-1/2 mx-auto p-5">
      {children}
    </div>
  );
}

export default Section;
