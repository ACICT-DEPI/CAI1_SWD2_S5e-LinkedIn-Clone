import React, { useState } from "react";
import Button from "../../../components/common/Button";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  // Handle message input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="message-input-container p-4 border rounded-md shadow-sm">
      <textarea
        className="message-input w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write a message..."
        value={message}
        onChange={handleInputChange}
        rows="3"
      />

      <div className="attachments-section flex items-center justify-between mt-3">
        <div className="flex gap-2">
          <Button label={"image"} />
          <Button label={"emoji"} />
          <Button label={"attachment"} />
        </div>
        <Button label={"send"} />
      </div>
    </div>
  );
};

export default MessageInput;
