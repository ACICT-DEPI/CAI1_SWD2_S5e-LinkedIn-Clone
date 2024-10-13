import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

useEffect(() => {
  socket?.on("newMessage", (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  // socket?.on("messageUpdated", (updatedMessage) => {
  //   setMessages((prev) =>
  //     prev.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
  //   );
  // });

  // socket?.on("messageDeleted", (messageId) => {
  //   setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
  // });

  return () => {
    socket?.off("newMessage");
    // socket?.off("messageUpdated");
    // socket?.off("messageDeleted");
  };
}, [socket, setMessages,messages]);
};

export default useListenMessages;
