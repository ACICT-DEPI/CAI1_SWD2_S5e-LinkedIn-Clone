import { useState } from "react";
import Button from "../../../../components/common/Button";
import { ImAttachment } from "react-icons/im";
import { PiGifFill } from "react-icons/pi";
import { GrEmoji } from "react-icons/gr";
import { AiFillPicture } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

  return (
    <form className="p-4 border-t border-gray-300" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write a message..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-linkedinLightGray"
        value={message}
				onChange={(e) => setMessage(e.target.value)}
      />
      <div className="attachments-section flex items-center justify-between mt-3">
        <div className="flex gap-2">
            <Button label={"image"} />
            <Button label={"emoji"} />
            <Button label={"attachment"} />
        </div>
        <Button type="submit" label={loading ? <div className='loading loading-spinner'></div> : "Send"} />
      </div>
    </form>
  );
};

export default MessageInput;
