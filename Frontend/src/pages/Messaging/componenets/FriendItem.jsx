import React from "react";

function FriendItem() {
  return (
    <div className="flex items-center gap-2 p-1 border-b-[1px] hover:bg-linkedinLightGray hover:cursor-pointer relative">
      <img
        src="https://picsum.photos/100/100"
        alt=""
        className="w-[50px] h-[50px] rounded-full"
      />
      <div className="">
        <p className="">
          Mohamed Essam Elramah
        </p>
        <p className="text-linkedinGray">
          Software Engineer | Frontend Developer
        </p>
      </div>
      <p className="text-sm end-0 bottom-0  text-nowrap absolute">Sep 11</p>
    </div>
  );
}

export default FriendItem;
