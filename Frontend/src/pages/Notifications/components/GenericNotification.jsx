import React, { useEffect, useRef, useState } from "react";
import deleteIcon from "../../../assets/images/delete.svg";
import ellipsisIcon from "../../../assets/images/ellipsis.svg";
import userIcon from "../../../assets/images/nav/user.svg";
import Section from "../../../components/common/Section";
const GenericNotification = ({ post, onDelete, action }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex items-center hover:bg-linkedin-lighthover-gray w-full justify-between p-4 cursor-pointer border-b">
      <div className="flex">
        <div className="mr-3">
          <img
            src="https://via.placeholder.com/40"
            alt={`${post.creator}'s avatar`}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <div className="text-gray-800">
            <span
              className={`${
                action === "loved your comment" ? "" : "font-semibold"
              }`}
            >
              {post.creator}{" "}
            </span>
            <span
              className={`${
                action === "loved your comment" ? "font-semibold" : ""
              }`}
            >
              {" "}
              {action}{" "}
            </span>

            {action === "reacted to a post" ? (
              <span className="line-clamp-3 max-w-xs">{post.content}</span>
            ) : action === "commented" ? (
              <span className="line-clamp-3">{post.comment}</span>
            ) : action === "loved your comment" ? (
              <div className="mx-auto w-[100%] cursor-default border-linkedin-darkhover-gray rounded-xl shadow-xs border-2 my-2 overflow-hidden">
                <div className="border-b w-full p-2 bg-linkedinWhite">{post.comment} </div>
                <div className="line-clamp-2 max-w-xs bg-linkedin-lighthover-blue p-1 text-linkedinGray">
                  {post.content}
                </div>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="text-gray-500 text-sm">{post.timestamp}</div>
        </div>
      </div>

      <div
        className="relative hover:bg-linkedin-darkhover-gray rounded-full p-4"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <img src={ellipsisIcon} alt="ellipsis icon" className="h-5 w-5 icon" />
        {/* Ellipsis Dropdown Menu */}
        {isDropdownOpen && (
          <div className="flex absolute right-0 bg-white shadow-lg rounded-md mt-8 z-50 ">
            <div
              className="flex justify-center items-center p-2 hover:bg-gray-200  bg-white shadow-lg rounded-md flex-shrink-0 gap-2"
              onClick={onDelete}
            >
              <img src={deleteIcon} alt="delete icon" />
              <span className="text-gray-500 font-semibold flex-shrink-0">
                Delete notifications
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericNotification;
