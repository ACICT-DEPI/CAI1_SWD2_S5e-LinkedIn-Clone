import { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await axios.post(`http://localhost:5000/api/messages/send/${selectedConversation._id}`,{message});
			
			setMessages([...messages, res.data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
