import { useEffect, useRef } from 'react';
import useGetMessages from '../../../../hooks/useGetMessages';
import Message from './Message';
import MessageSkeleton from './MessageSkeleton';
import useListenMessages from '../../../../hooks/useListenMessages';

// const messages = [
//   // { from: 'Jana Fadl', content: 'Hey, how are you?' },
//   // { from: 'You', content: 'I’m good, thank you!' },
//   // Add more message data
// ];

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  console.log(messages);
  return (
    <div className="space-y-4">
      {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
  );
};

export default Messages;
