import { FiEdit } from 'react-icons/fi'; // Edit Icon
import { AiFillDelete } from 'react-icons/ai'; // Delete Icon
import { useAuthStore } from "../../../../store/authStore";
import useConversation from "../../../../store/useConversation";
import { extractTime } from "../../../../utils/extractTime";
import useDeleteMessage from '../../../../hooks/useDeleteMessage';
import useEditMessage from '../../../../hooks/useEditMessage';
import { useState } from 'react';
import toast from 'react-hot-toast'; 
import ConfirmationModal from '../../../../components/common/ConfirmationModal'; 

const Message = ({ message }) => {
  const { user } = useAuthStore();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user._id;

  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? user.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-linkedinBlue" : "bg-linkedinGray";

  const { deleteMessage } = useDeleteMessage();
  const { editMessage } = useEditMessage();
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(message.message);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleDelete = () => {
    deleteMessage(message._id);
    setIsModalOpen(false); // Close the modal after confirming
  };

  const handleSave = () => {
    editMessage(message._id, newContent);
    setIsEditing(false);
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
            onKeyDown={(e) => e.key === "Enter" && handleSave()} // Save on Enter key
          />
        ) : (
          <span>{message.message}</span>
        )}
      </div>

      <div className="chat-footer opacity-50 text-s flex gap-1 items-center">
        <span>{formattedTime}</span>
        {fromMe && (
          <div className="flex gap-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="text-gray-500 font-semibold cursor-pointer underline"
              >
                Save
              </button>
            ) : (
              <FiEdit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer hover:text-linkedinGreen"
                title="Edit"
              />
            )}
            <AiFillDelete
              onClick={() => setIsModalOpen(true)} // Open modal on delete click
              className="cursor-pointer hover:text-red-500"
              title="Delete"
            />
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        onConfirm={handleDelete} // Confirm delete
        message="Are you sure you want to delete this message?"
      />
    </div>
  );
};

export default Message;
