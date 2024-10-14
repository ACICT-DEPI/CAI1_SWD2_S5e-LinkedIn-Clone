import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../../../store/useConversation";
import { useEffect } from "react";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // Cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="bg-white md:mt-4 p-5 h-full flex flex-col">
      {selectedConversation ? (
        <>
          {/* Header Section */}
          <div className="flex items-center space-x-4 p-3 border-b border-gray-300">
            <img
              src={selectedConversation.profilePicture}
              alt={`${selectedConversation.username}'s profile`}
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-lg font-semibold">
              {selectedConversation.username}
            </h2>
          </div>

          {/* Messages Section */}
          <div className="flex-1 p-4 overflow-y-auto">
            <Messages />
          </div>
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center text-gray-500">
      <div className="mb-4">{/* You can add an icon here if needed */}</div>
      <h2 className="text-lg font-semibold">No Conversation Selected</h2>
      <p className="text-sm">
        Please select a conversation to start messaging.
      </p>
    </div>
  );
};
