import React from "react";
import { extractTime, extractTimeDuration } from "../../utils/extractTime";

function PostUserInfo({ post }) {
  return post ? (
    <div className="flex items-center gap-2">
      <img
        src={post.auther.profilePicture}
        alt=""
        className="w-[50px] h-[50px] rounded-full"
      />
      <div>
        <div className="cursor-pointer">
          <div className="flex gap-2">
            <p className="font-semibold text-black hover:text-linkedinBlue hover:underline">
              {post.auther.firstName} {post.auther.lastName}
            </p>
            <p className=" text-linkedinGray">&#x2022; 1st</p>
          </div>
          <p className="text-linkedinGray text-sm">{post.auther.headline}</p>
          <p className="text-linkedinGray text-sm">
            {extractTimeDuration(post.createdAt)} &#x2022;{" "}
            {toString(post.updatedAt) !== toString(post.CreatedAt)
              ? "Edited"
              : "Created"}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <>loading</>
  );
}

export default PostUserInfo;
