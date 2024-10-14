import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PostShortView from "../../../components/Post/PostShortView";
import Button from "../../../components/common/Button";
import editIcon from "../../../assets/images/comment-icon.svg";
import { Link } from "react-router-dom";
import Section from "../../../components/common/Section";
import { useAuthStore } from "../../../store/authStore";

function ActivitySection({ posts }) {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate(); // Initialize navigate

  const handleFollowersClick = () => {
    navigate("/followers"); // Navigate to followers page
  };

  return (
    <>
      <Section>
        <div className="w-1/2">
          <div className="flex gap-2 justify-between">
            <div>
              <p className="font-bold text-xl">Activity</p>
              <p
                className="text-linkedinBlue cursor-pointer"
                onClick={handleFollowersClick} // Add click handler
              >
                {isLoading ? (
                  "Loading followers..."
                ) : (
                  `${user?.connectedUsers?.length || 0} followers`
                )}
              </p>
            </div>
            <div className="flex">
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
            </div>
          </div>
        </div>

        <div className="flex gap-2 py-1 pb-4">
          <Button
            label={"Post"}
            onClick={() => console.log("Post button clicked")}
          />
          <Button
            label={"Comments"}
            onClick={() => console.log("Comments button clicked")}
          />
        </div>

        <div>
          {posts ? (
            posts.map((post, index) => <PostShortView key={index} post={post} />)
          ) : (
            <>...loading</>
          )}
        </div>

        <Link
          to="allActivity"
          className="flex justify-center hover:bg-linkedinLightGray border-t-2 py-3 cursor-pointer"
        >
          Show all Posts
        </Link>
      </Section>
    </>
  );
}

export default ActivitySection;
