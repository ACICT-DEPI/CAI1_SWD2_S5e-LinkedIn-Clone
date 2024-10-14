import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useEditMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();

  const editMessage = async (messageId, newContent) => {
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:5001/api/messages/edit/${messageId}`, {
        message: newContent,
      });

      const updatedMessage = res.data;
      const updatedMessages = messages.map((msg) =>
        msg._id === updatedMessage._id ? updatedMessage : msg
      );

      setMessages(updatedMessages);
      toast.success("Message edited successfully!");
    } catch (error) {
      console.error("Error editing message:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { editMessage, loading };
};

export default useEditMessage;
