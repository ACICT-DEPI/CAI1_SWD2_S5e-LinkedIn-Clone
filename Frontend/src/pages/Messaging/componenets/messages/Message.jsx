import { FiEdit } from 'react-icons/fi'; // Edit Icon
import { AiFillDelete } from 'react-icons/ai'; // Delete Icon
import { useAuthStore } from "../../../../store/authStore";
import useConversation from "../../../../store/useConversation";
import { extractTime } from "../../../../utils/extractTime";
import useDeleteMessage from '../../../../hooks/useDeleteMessage';
import useEditMessage from '../../../../hooks/useEditMessage';
import { useState } from 'react';

const Message = ({ message }) => {
  const { user } = useAuthStore();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user._id;

  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? user.profilePicute : selectedConversation?.profilePicute;
  const bubbleBgColor = fromMe ? "bg-linkedinBlue" : "bg-linkedinGray";

  const { deleteMessage, loading: deleting } = useDeleteMessage();
  const { editMessage, loading: editing } = useEditMessage();
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(message.message);

  const handleDelete = () => deleteMessage(message._id);

  const handleEdit = () => {
    if (isEditing) editMessage(message._id, newContent);
    setIsEditing(!isEditing);
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>

      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {isEditing ? (
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-transparent border-b border-white"
          />
        ) : (
          <span>{message.message}</span>
        )}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        <span>{formattedTime}</span>
        {fromMe && (
          <div className="flex gap-2">
            <FiEdit
              onClick={handleEdit}
              className="cursor-pointer hover:text-yellow-500"
              title={isEditing ? "Save" : "Edit"}
            />
            <AiFillDelete
              onClick={handleDelete}
              className="cursor-pointer hover:text-red-500"
              title="Delete"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
