import React from 'react'

function Comment() {
  return (
    <div className="flex gap-2 py-4">
      <img
        src="https://picsum.photos/150/150"
        alt=""
        className="w-[50px] h-[50px] rounded-full"
      />
      <div className="rounded-tl-none rounded-lg bg-[#fff] w-full px-3 py-2">
        <div className="cursor-pointer pb-2">
          <div className="flex gap-2 ">
            <p className="text-bold text-black hover:text-linkedinBlue hover:underline">
              John Doe
            </p>
            <p className=" text-linkedinGray">&#x2022; 1st</p>
          </div>
          <p className="text-linkedinGray text-xs">
            Software Engineer | Frontend Developer
          </p>
        </div>
        <div>
          <p>Congratulations ❤️</p>
        </div>
      </div>
    </div>
  );
}

export default Comment