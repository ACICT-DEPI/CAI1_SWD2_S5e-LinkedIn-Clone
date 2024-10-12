import useGetConversations from '../../../../hooks/useGetConversations';
import Conversation from './Conversation';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div>
      {conversations.map((conv, index) => (
        <div key={conv._id}>
          <Conversation conversation={conv} />
          {/* Horizontal Separator */}
          <hr className="border-t border-gray-300 my-1" />
        </div>
      ))}
      {/* Optional loading spinner */}
      {loading && <span className='loading loading-spinner mx-auto'></span>}
    </div>
  );
};

export default Conversations;
