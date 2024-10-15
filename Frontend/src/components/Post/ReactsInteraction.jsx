import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import commentIcon from "../../assets/images/comment-icon.svg";
import likeIcon from "../../assets/images/like-icon.svg";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import { addLike, deleteLike, sharePost } from "../../utils/postApi";
import LikeIcon from "../Icons/LikeIcon";

const handelCommentClicked = (post_id) => {};

const handelShareClicked = (post) => {
  sharePost(post.auther, post._id);
};

function ReactsInteraction({ post, setChange }) {
  const { user } = useAuthStore();
  const [isLike, setIsLike] = useState(false);

  // Check if the user has already liked the post
  useEffect(() => {
    const checkLike = () => {
      return post.likes.includes(user._id);
    };
    setIsLike(checkLike());
  }, []);

  // Like handler
  const handleLikeClick = () => {
    if (!isLike) {
      addLike(post._id, "post");
      setIsLike(true);
      setChange("add like");
    } else {
      deleteLike(post._id, "post");
      setIsLike(false);
      setChange("delete like");
    }
  };

  return (
    <div className="flex justify-around py-4 flex-wrap">
      {/* Like */}
      <Button
        label={"Like"}
        icon={<LikeIcon fill={isLike ? "#005582" : "black"} />}
        onClick={handleLikeClick}
        styleType="outline"
      />
      {/* Comment */}
      <Button
        label={"Comment"}
        icon={<img src={commentIcon} alt="comment" />}
        onClick={() => console.log("Comment button clicked")}
        styleType="outline"
      />
      {/* Repost */}
      <Button
        label={"Share"}
        icon={<img src={commentIcon} alt="repost" />}
        onClick={() => handelShareClicked(post)}
        styleType="outline"
      />
      {/* Send */}
      <Button
        label={"Send"}
        icon={<img src={commentIcon} alt="send" />}
        onClick={() => console.log("Send button clicked")}
        styleType="outline"
      />
    </div>
  );
}

export default ReactsInteraction;
