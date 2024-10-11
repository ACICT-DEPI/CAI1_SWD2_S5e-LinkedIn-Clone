import { useAuthStore } from "../../../../store/authStore";
import useConversation from "../../../../store/useConversation";
import { extractTime } from "../../../../utils/extractTime";

const Message = ({ message }) => {
  const {  user } = useAuthStore();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? user.profilePicute : selectedConversation?.profilePicute;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
  );
};

export default Message;




// const Message = ({ message }) => {
//   const isOwnMessage = message.from === 'You';
  
//   return (
//     <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
//       <div className={`max-w-xs p-3 rounded-3xl ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
//         <p>{message.content}</p>
//       </div>
//     </div>
//   );
// };

// export default Message;
