import React from "react";
import addFriendIcon from "../../assets/images/item-icon.svg";

function AddComment() {
  return (
    <div className="flex gap-1 w-full">
      <img
        src="https://picsum.photos/100/100"
        alt="userPhoto"
        className="w-[60px] h-[60px] rounded-full"
      />
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Add a comment..."
          className="rounded-full border-2 w-full flex justify-between p-4"
        />
        <div className="absolute right-2 flex gap-3">
          <img src={addFriendIcon} alt="emojiIcon" />
          <img src={addFriendIcon} alt="photoIcon" />
        </div>
      </div>
    </div>
  );
}

export default AddComment;
