import Messages from './Messages';
import MessageInput from './MessageInput';

const MessageContainer = () => {
  return (
    <div className="bg-white rounded-lg md:mt-4 p-5">
      <div className="flex-1 p-4 overflow-auto">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
