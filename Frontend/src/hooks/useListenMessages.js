import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {

			setMessages([...messages, newMessage]);
		});

    socket?.on("messageEdited", (editedMessage) => {
      const updatedMessages = messages.map((msg) =>
        msg._id === editedMessage._id ? editedMessage : msg
      );
      setMessages(updatedMessages);
    });

    socket?.on("messageDeleted", (messageId) => {
      const filteredMessages = messages.filter((msg) => msg._id !== messageId);
      setMessages(filteredMessages);
    });

		return () => {
      socket?.off("newMessage");
      socket?.off("messageEdited");
      socket?.off("messageDeleted");
    };
	}, [socket, setMessages, messages]);
};
export default useListenMessages;