import React from "react";

function Section({children}) {
  return (
    <div className="mx-auto w-[100%] cursor-default border-gray-100 rounded-lg shadow-sm border-2 my-3 p-4 pb-0 ">
      {children}
    </div>
  );
}

export default Section;
