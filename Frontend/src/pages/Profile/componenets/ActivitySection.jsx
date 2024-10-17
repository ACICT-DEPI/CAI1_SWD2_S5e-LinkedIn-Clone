import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import PostShortView from "../../../components/Post/PostShortView";
import Button from "../../../components/common/Button";
import editIcon from "../../../assets/images/comment-icon.svg";
import { Link } from "react-router-dom";
import Section from "../../../components/common/Section";
import { useAuthStore } from "../../../store/authStore";
import { FaArrowRight } from "react-icons/fa";
import { getUserPosts } from "../../../utils/postApi";

function ActivitySection({ isOwnProfile }) {
  const { profileId } = useParams();
  const [select, setSelect] = useState("posts");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getUserPosts(setPosts, 1, 3, [], profileId);
  }, []);
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate(); // Initialize navigate

  const handleFollowersClick = () => {
    navigate("/followers"); // Navigate to followers page
  };
  const handelShowPost = (id) => {
    navigate(`/profile/allactivity/${profileId}`); // Navigate to followers page
  };
  return (
    <div className="bg-white rounded-lg mt-3 w-1/2 mx-auto">
      <div className="flex gap-2 justify-between">
        <div className="my-5">
          <h2 className="text-lg font-semibold px-5 text-linkedinDarkGray">
            {isOwnProfile ? "Activity" : "Activity"}
          </h2>
          <p
            className="text-linkedinBlue cursor-pointer px-5"
            onClick={handleFollowersClick} // Add click handler
          >
            {isLoading
              ? "Loading followers..."
              : `${user?.connectedUsers?.length || 0} followers`}
          </p>
        </div>
        <div className="flex px-5 my-5">
          {isOwnProfile && (
            <>
              <Button
                label={"Create a Post"}
                onClick={() => console.log("Post button clicked")}
                styleType="outline"
              />
              <Button
                icon={<img src={editIcon} alt="Edit" />}
                onClick={() => console.log("Edit button clicked")}
                styleType="outline"
              />
            </>
          )}
        </div>
      </div>
      {/* <div className="w-1/2"></div> */}

      <div className="flex gap-2 py-1 pb-4 px-5">
        <Button
          label={"Post"}
          onClick={() => console.log("Post button clicked")}
        />
        <Button
          label={"Comments"}
          onClick={() => console.log("Comments button clicked")}
        />
      </div>
      <hr className="py-2" />
      {select === "posts" ? (
        <div className="px-5">
          {posts ? (
            posts.map((post, index) => (
              <PostShortView key={index} post={post} />
            ))
          ) : (
            <>...loading</>
          )}
        </div>
      ) : (
        <></>
      )}
      {select === "posts" ? <div className="px-5"></div> : <></>}
      <hr />
      <button
        onClick={handelShowPost}
        className="w-full font-semibold p-2 rounded-lg hover:bg-linkedin-lighthover-gray text-linkedinsecondGray hover:text-linkedinDarkGray"
      >
        <div className="flex items-center justify-center gap-2 px-5">
          <p className="">Show all Posts</p>
          <FaArrowRight />
        </div>
      </button>
    </div>
  );
}

export default ActivitySection;
