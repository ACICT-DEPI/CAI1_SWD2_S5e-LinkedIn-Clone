import React from 'react'
import Button from './Button'
import commentIcon from "../../assets/images/comment-icon.svg";
import likeIcon from "../../assets/images/like-icon.svg";

function ReactsInteraction() {
  return (
    <div className="flex justify-around py-4 flex-wrap">
      {/* Like */}
      <Button
        label={"Like"}
        icon={<img src={likeIcon} />}
        onClick={() => console.log("Like button clicked")}
        styleType="outline"
      />
      {/* comment */}
      <Button
        label={"Comment"}
        icon={<img src={commentIcon} />}
        onClick={() => console.log("Comment button clicked")}
        styleType="outline"
      />
      <Button
        label={"Repost"}
        icon={<img src={commentIcon} />}
        onClick={() => console.log("Repost button clicked")}
        styleType="outline"
      />
      <Button
        label={"Send"}
        icon={<img src={commentIcon} />}
        onClick={() => console.log("Send button clicked")}
        styleType="outline"
      />
      {/* repost */}
      {/* send */}
    </div>
  );
}

export default ReactsInteraction