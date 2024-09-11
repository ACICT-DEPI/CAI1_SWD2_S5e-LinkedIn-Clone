import React from 'react'
import likeIcon from '../../assets/images/like-icon.svg';
function Reacts() {
  return (
    <div className="flex justify-between">
      <div className="relative flex items-center">
        <div className="flex items-center ">
          <img
            src={likeIcon}
            alt=""
            className="w-[17px] h-[17px] bg-linkedinBlue rounded-full p-[2px] border-[1px]"
          />
          <img
            src={likeIcon}
            alt=""
            className="w-[17px] h-[17px] bg-red-500 rounded-full p-[2px] relative right-1 border-[1px]"
          />
          <img
            src={likeIcon}
            alt=""
            className="w-[17px] h-[17px] bg-green-600 rounded-full p-[2px] relative right-2 border-[1px]"
          />
        </div>
        <p className="text-linkedinGray hover:text-linkedinBlue hover:underline">
          %%REACTS%%
        </p>
      </div>
      <div>
        <p className="text-linkedinGray hover:text-linkedinBlue hover:underline">
          %COMMENTS% comments
        </p>
      </div>
    </div>
  );
}

export default Reacts