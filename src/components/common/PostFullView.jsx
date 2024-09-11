import React, { useState } from "react";
import Section from "./section";
import Reacts from "./Reacts";
import ReactsInteraction from "./ReactsInteraction";

function PostFullView() {
  const [showMore, setShowMore] = useState(false);
  const description = `
Introducing 𝐅𝐀𝐑 𝐀𝐖𝐀𝐘: My Latest React Project 🥳

I’m excited to share 𝐅𝐀𝐑 𝐀𝐖𝐀𝐘, my 2nd React project designed to help travelers manage and track what they should pack💼.

𝑾𝒉𝒂𝒕 𝑰 𝑳𝒆𝒂𝒓𝒏𝒆𝒅 𝒇𝒓𝒐𝒎 𝑻𝒉𝒊𝒔 𝑷𝒓𝒐𝒋𝒆𝒄𝒕:

𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭-𝐃𝐫𝐢𝐯𝐞𝐧 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐦𝐞𝐧𝐭: The importance of building reusable, scalable components to keep the codebase organized and maintainable.

𝐒𝐭𝐚𝐭𝐞 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭: How to efficiently manage state to ensure smooth and responsive user interactions.

𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭 𝐂𝐨𝐦𝐩𝐨𝐬𝐢𝐭𝐢𝐨𝐧: Crafting a modular structure through smart component composition, leading to cleaner code and easier maintenance.

𝐇𝐨𝐨𝐤𝐬 𝐌𝐚𝐬𝐭𝐞𝐫𝐲: Leveraging React hooks for effective state management and handling side effects.

I’d love to connect with others who are passionate about React and front-end development!

hashtag#frontend hashtag#css hashtag#html hashtag#javascript hashtag#developer hashtag#programming hashtag#coding hashtag#webdeveloper hashtag#webdevelopment hashtag#webdesign hashtag#frontenddeveloper hashtag#code hashtag#programmer hashtag#coder hashtag#webdev hashtag#web hashtag#reactjs hashtag#softwaredeveloper hashtag#development hashtag#js hashtag#software hashtag#dev hashtag#developers hashtag#ui hashtag#ComponentDriven
`;
  return (
    <Section>
      {/* title with profile picture */}
      <div className="flex gap-2 justify-between items-start pb-3">
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
        <div>{/* more icon */}</div>
      </div>
      {/* Description */}
      <div>
        {showMore ? (
          <p>
            {description}
            <span
              className="text-linkedinGray hover:text-linkedinBlue cursor-pointer"
              onClick={() => setShowMore(false)}
            >
              less
            </span>
          </p>
        ) : (
          <p>
            {description.substring(0, description.length / 4)}
            <span
              className="text-linkedinGray hover:text-linkedinBlue cursor-pointer"
              onClick={() => setShowMore(true)}
            >
              ...more
            </span>
          </p>
        )}
      </div>
      {/* Photos -videos */}
      <div className="relative ">
        <img
          src="https://picsum.photos/2000/2000"
          alt=""
          className="w-[100wh] max-height: fit-content; rounded-xl my-3 object-cover"
        />
      </div>
      {/* Reacts */}
      <Reacts />
      <hr />
      <ReactsInteraction />
    </Section>
  );
}

export default PostFullView;
