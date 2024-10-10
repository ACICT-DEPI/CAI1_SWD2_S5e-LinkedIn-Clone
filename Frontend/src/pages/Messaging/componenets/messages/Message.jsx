const Message = ({ message }) => {
  const isOwnMessage = message.from === 'You';
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs p-3 rounded-lg ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default Message;
