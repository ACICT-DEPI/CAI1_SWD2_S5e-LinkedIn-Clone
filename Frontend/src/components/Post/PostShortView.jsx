import React from "react";
import Reacts from "./Reacts";

const description = `
Introducing 𝐅𝐀𝐑 𝐀𝐖𝐀𝐘: My Latest React Project 🥳

I’m excited to share 𝐅𝐀𝐑 𝐀𝐖𝐀𝐘, my 2nd React project designed to help travelers manage and track what they should pack💼.

𝑾𝒉𝒂𝒕 𝑰 𝑳𝒆𝒂𝒓𝒏𝒆𝒅 𝒇𝒓𝒐𝒎 𝑻𝒉𝒊𝒔 𝑷𝒓𝒐𝒋𝒆𝒄𝒕:

𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭-𝐃𝐫𝐢𝐯𝐞𝐧 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐦𝐞𝐧𝐭: The importance of building reusable, scalable components to keep the codebase organized and maintainable.

𝐒𝐭𝐚𝐭𝐞 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭: How to efficiently manage state to ensure smooth and responsive user interactions.

𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭 𝐂𝐨𝐦𝐩𝐨𝐬𝐢𝐭𝐢𝐨𝐧: Crafting a modular structure through smart component composition, leading to cleaner code and easier maintenance.

𝐇𝐨𝐨𝐤𝐬 𝐌𝐚𝐬𝐭𝐞𝐫𝐲: Leveraging React hooks for effective state management and handling side effects.

I’d love to connect with others who are passionate about React and front-end development!
`;


function PostShortView() {
  return (
    <>
      <div className="cursor-pointer">
        {/* auther and date */}
        <div>
          <p className="text-linkedinGray">
            {post.auther.firstName} {post.auther.lastName} posted this .{" "}
            {extractTimeDuration(post.createdAt)}
          </p>
        </div>
        {/* image - title - description */}
        <div className="py-1">
          <div className="flex gap-2">
            <img
              src={post.images[0]}
              alt={"image"}
              className="w-[90px] h-[70px] rounded-lg"
            />
            <p>
              {description.length > 210 ? (
                <>
                  {description.substring(0, 210) + "..."}
                  <br />
                  <div className="flex justify-end">
                    <p>...</p>
                    <p className="hover:text-linkedinBlue">show more</p>
                  </div>
                </>
              ) : (
                description
              )}
            </p>
          </div>
        </div>
        {/* likes - comments ''buttons'' */}
        <div className="py-3">
          <Reacts post={post}/>
        </div>
        {/*want to check not to add it in 2 cases 1->only one post 2->with last post*/}
        <hr className="py-1" />
      </div>
    </>
  );
}

export default PostShortView;
