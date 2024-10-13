import React from 'react'

function PostUserInfo({post}) {
  console.log(post);
  
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
              {post.auther.firstName} {" "} {post.auther.lastName}
            </p>
            <p className=" text-linkedinGray">&#x2022; 1st</p>
          </div>
          <p className="text-linkedinGray text-sm">
            {post.auther.headline}
          </p>
          <p className="text-linkedinGray text-sm">{post.updatedAt} &#x2022; {toString(post.updatedAt) !== toString(post.CreatedAt)?"Edited":"Created"}</p>
        </div>
      </div>
    </div>
  );
}

export default PostUserInfo