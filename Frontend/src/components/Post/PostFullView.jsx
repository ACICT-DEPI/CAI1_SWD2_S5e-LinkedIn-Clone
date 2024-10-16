import React, { useEffect, useRef, useState } from "react";
import Section from "../common/section";
import Reacts from "./Reacts";
import ReactsInteraction from "./ReactsInteraction";
import AddComment from "./AddComment";
import PostUserInfo from "./PostUserInfo";
import Comment from "./Comment";
import LargeText from "../common/LargeText";
import axios from "axios";
import { getPostComments } from "../../utils/postApi";
function PostFullView({ post, setChange }) {
  const description = post.content;

  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const componentRef = useRef(null);
  useEffect(() => {
    getPostComments(setComments, 1, 10, comments, post._id);
  }, []);
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
    <div className="bg-gray-100 p-3 rounded my-2">
      {/* title with profile picture */}
      <div className="flex gap-2 justify-between items-start pb-3 ">
        <PostUserInfo post={post} />
        <div>{/* more icon */}</div>
      </div>
      {/* Description */}
      <div>
        <LargeText description={description} style="text-linkedinDarkGray" />
      </div>
      {/* Photos -videos */}
      {/* todo make it slider ! */}
      <div
        className="relative group cursor-pointer w-full object-cover flex justify-center"
        onClick={handleImageClick}
      >
        {post.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="w-[400px]  rounded-xl my-3 object-cover"
          />
        ))}
        <div className="absolute bottom-5 right-5 bg-[rgba(255,255,255,0.6)] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {post.images.length}
        </div>
      </div>

      {/* Reacts */}
      <Reacts post={post} />
      <hr />
      <ReactsInteraction post={post} setChange={setChange} />
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
          <PostFocus
            componentRef={componentRef}
            post={post}
            comments={comments}
            setChange={setChange}
          />
        </div>
      )}
    </div>
  );
}

const PostFocus = ({ componentRef, post, comments, setChange }) => {
  const [showMore, setShowMore] = useState(false);
  console.log("comments", comments);

  const description = post.content;
  return post ? (
    <div
      className="bg-white rounded-xl shadow-lg max-w-[100%] h-[95%] grid grid-cols-4 2xl:w-[80%] "
      ref={componentRef}
    >
      {/* Left Column (Image - 75%) */}
      <div className="col-span-3 bg-black flex items-center justify-center relative rounded-l-xl">
        {/* todo make a slider */}
        <img
          src={post.images[0]}
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
          <ReactsInteraction post={post} setChange={setChange} />
          <AddComment />
          {comments ? (
            comments.map((comment, index) => <Comment comment={comment} />)
          ) : (
            <>loading</>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>loading</>
  );
};

export default PostFullView;
