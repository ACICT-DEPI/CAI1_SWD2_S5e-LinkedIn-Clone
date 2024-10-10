import Messages from './Messages';
import MessageInput from './MessageInput';

const MessageContainer = () => {
  return (
    <div className="bg-white md:mt-4 p-5 h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
