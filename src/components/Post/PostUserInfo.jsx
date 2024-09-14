import React from 'react'

function PostUserInfo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://picsum.photos/150/150"
        alt=""
        className="w-[50px] h-[50px] rounded-full"
      />
      <div>
        <div className="cursor-pointer">
          <div className="flex gap-2">
            <p className="text-bold text-black hover:text-linkedinBlue hover:underline">
              John Doe
            </p>
            <p className=" text-linkedinGray">&#x2022; 1st</p>
          </div>
          <p className="text-linkedinGray text-sm">
            Software Engineer | Frontend Developer
          </p>
          <p className="text-linkedinGray text-sm">1mo &#x2022; Edited</p>
        </div>
      </div>
    </div>
  );
}

export default PostUserInfo