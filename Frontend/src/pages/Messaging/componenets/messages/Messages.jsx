import Message from './Message';

const messages = [
  { from: 'Jana Fadl', content: 'Hey, how are you?' },
  { from: 'You', content: 'I’m good, thank you!' },
  // Add more message data
];

const Messages = () => {
  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
};

export default Messages;
