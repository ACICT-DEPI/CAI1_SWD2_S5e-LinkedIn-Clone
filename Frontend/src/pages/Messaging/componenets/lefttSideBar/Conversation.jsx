const Conversation = ({ conversation }) => {
  return (
    <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      <div className="flex-1">
        <h4 className="text-gray-900 font-medium">{conversation.name}</h4>
        <p className="text-gray-500 text-sm">{conversation.lastMessage}</p>
      </div>
      <span className="text-gray-500 text-sm">{conversation.date}</span>
    </div>
  );
};

export default Conversation;
