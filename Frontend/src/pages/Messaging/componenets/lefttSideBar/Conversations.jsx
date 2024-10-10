import Conversation from './Conversation';

const conversations = [
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Jana Fadl', lastMessage: 'You sent a post', date: 'Oct 3' },
  { name: 'Ibrahim Muhammed', lastMessage: 'Job offer!', date: 'Sep 30' },
  { name: 'Ibrahim Muhammed', lastMessage: 'Job offer!', date: 'Sep 30' },
  // Add more conversation data
];

const Conversations = () => {
  return (
    <div>
      {conversations.map((conv, index) => (
        <Conversation key={index} conversation={conv} />
      ))}
    </div>
  );
};

export default Conversations;
