import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();

  const deleteMessage = async (messageId) => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5001/api/messages/delete/${messageId}`
      );

      const updatedMessages = messages.filter((msg) => msg._id !== messageId);
      setMessages(updatedMessages);
      toast.success("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMessage, loading };
};

export default useDeleteMessage;
