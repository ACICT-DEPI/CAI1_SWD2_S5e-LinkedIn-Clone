const MessageInput = () => {
  return (
    <div className="p-4 border-t border-gray-300">
      <input
        type="text"
        placeholder="Write a message..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
