import React, { useEffect, useRef, useState } from "react";
import Section from "./section";
import Reacts from "./Reacts";
import ReactsInteraction from "./ReactsInteraction";
import AddComment from "./AddComment";
import PostUserInfo from "./PostUserInfo";
import Comment from "./Comment";
import LargeText from "./LargeText";

function PostFullView() {
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

  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  // Function to open the PostFocus component when the image is clicked
  const handleImageClick = () => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
  };

  // Close PostFocus when clicking outside of it
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsVisible(false);
      document.body.style.overflow = "";
    }
  };

  // Add event listener to detect clicks outside the component
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Section>
        {/* title with profile picture */}
        <div className="flex gap-2 justify-between items-start pb-3">
          <PostUserInfo />
          <div>{/* more icon */}</div>
        </div>
        {/* Description */}
        <div>
         <LargeText description={description}/>
        </div>
        {/* Photos -videos */}
        <div
          className="relative group cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src="https://picsum.photos/2000/2000"
            alt=""
            className="w-[100vw] rounded-xl my-3 object-cover"
          />
          <div className="absolute bottom-5 right-5 bg-[rgba(255,255,255,0.6)] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            1
          </div>
        </div>

        {/* Reacts */}
        <Reacts />
        <hr />
        <ReactsInteraction />
      </Section>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
          <PostFocus props={componentRef} />
        </div>
      )}
    </>
  );
}

const PostFocus = ({ props }) => {
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
    <div
      className="bg-white rounded-xl shadow-lg max-w-[100%] h-[95%] grid grid-cols-4 2xl:w-[80%] "
      ref={props}
    >
      {/* Left Column (Image - 75%) */}
      <div className="col-span-3 bg-black flex items-center justify-center relative rounded-l-xl">
        <img
          src="https://picsum.photos/2000/2000"
          alt="Post Image"
          className="max-w-full max-h-full m-auto absolute"
        />
      </div>
      {/* Right Column (Extra Info - 25%) */}
      <div className="col-span-1 bg-gray-100 p-4 pt-0 overflow-auto  flex-col flex-nowrap rounded-r-xl">
        {/* header */}
        <div className="sticky top-0 bg-gray-100 py-2 z-10 w-full">
          {/* Changed from fixed to sticky */}
          <PostUserInfo />
        </div>
        <div className="">
          {/* description */}
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
          <Reacts />
          <ReactsInteraction />
          <AddComment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default PostFullView;
