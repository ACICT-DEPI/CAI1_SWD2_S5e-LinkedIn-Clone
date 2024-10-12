import useGetConversations from '../../../../hooks/useGetConversations';
import Conversation from './Conversation';

const Conversations = ({ searchTerm }) => {
  const { loading, conversations } = useGetConversations();

  // Filter conversations based on searchTerm
  const filteredConversations = conversations.filter((conv) =>
    conv.username.toLowerCase().includes(searchTerm) 
  );

  return (
    <div>
      {filteredConversations.map((conv) => (
        <div key={conv._id}>
          <Conversation conversation={conv} />
          <hr className="border-t border-gray-300 my-1" />
        </div>
      ))}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Conversations;
