import useGetConversations from '../../../../hooks/useGetConversations';
import Conversation from './Conversation';


const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div>
      {conversations.map((conv, index) => (
        <Conversation key={conv._id} conversation={conv} />
      ))}

      {/* {loading ? <span className='loading loading-spinner mx-auto'></span> : null} */}
    </div>
    
  );
};

export default Conversations;
