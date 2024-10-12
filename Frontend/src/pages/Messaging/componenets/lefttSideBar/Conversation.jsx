import useConversation from "../../../../store/useConversation";
import { useSocketContext } from "../../../../context/SocketContext";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

  return (
    <div className={`flex items-center space-x-4 p-2 hover:bg-linkedin-lighthover-blue cursor-pointer
      ${isSelected ? "bg-linkedin-lighthover-blue" : ""}
      `} onClick={() => setSelectedConversation(conversation)} >
      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      <div className="flex-1">
        <h4 className="text-gray-900 font-medium">{conversation.username}</h4>
        <p className="text-gray-500 text-sm">{`${isOnline ? "online" : ""}`}</p>
      </div>
      {/* <span className="text-gray-500 text-sm">{conversation.date}</span> */}
    </div>
  );
};

export default Conversation;
