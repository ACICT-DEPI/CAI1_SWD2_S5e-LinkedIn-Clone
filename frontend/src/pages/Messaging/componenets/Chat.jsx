import React from "react";
import PostUserInfo from "../../../components/Post/PostUserInfo";
import ChatContent from "./ChatContent";

// get user from id from the url
const isTrue = true;
function Chat() {
  return (
    <div className="">
      <div className="border-b-[1px]">
        <p className="font-semibold text-lg">Mohamed Essam Elramah</p>
        <div className="flex items-center gap-1">
          {isTrue ? (
            <>
              <div className="rounded-full w-[10px] h-[10px] bg-green-600 "></div>
              <p className="text-sm">Active now</p>
            </>
          ) : (
            <>
              <div className="rounded-full w-[10px] h-[10px] bg-red-600"></div>
              <p className="text-sm">Not active now</p>
            </>
          )}
        </div>
      </div>
      <div className="overflow-auto">
        <div className="py-2 pb-5">
          <div className="relative w-fit py-2">
            <img
              src="https://picsum.photos/200/200"
              alt=""
              className="w-[80px] h-[80px] rounded-full"
            />
            <div
              className={
                isTrue
                  ? " border-4 border-green-600 rounded-full w-[20px] h-[20px] bg-white absolute end-1 bottom-2"
                  : " border-4 border-red-600 rounded-full w-[20px] h-[20px] bg-white absolute end-1 bottom-2"
              }
            ></div>
          </div>
          <div>
            <div className="cursor-pointer">
              <div className="flex gap-2">
                <p className="text-bold text-black hover:text-linkedinBlue hover:underline">
                  Mohamed Essam Elramah
                </p>
                <p className=" text-linkedinGray">&#x2022; 1st</p>
              </div>
              <p className="text-linkedinGray text-sm">
                Software Engineer | Frontend Developer
              </p>
            </div>
          </div>
        </div>
        <ChatContent/>
      </div>
    </div>
  );
}

export default Chat;
