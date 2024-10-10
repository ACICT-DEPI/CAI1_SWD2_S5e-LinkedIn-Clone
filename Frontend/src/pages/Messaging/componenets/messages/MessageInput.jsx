import { useState } from "react";
import Button from "../../../../components/common/Button";
import { ImAttachment } from "react-icons/im";
import { PiGifFill } from "react-icons/pi";
import { GrEmoji } from "react-icons/gr";
import { AiFillPicture } from "react-icons/ai";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  // Handle message input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="p-4 border-t border-gray-300">
      <textarea
        onChange={handleInputChange}
        placeholder="Write a message..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-linkedinLightGray"
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
