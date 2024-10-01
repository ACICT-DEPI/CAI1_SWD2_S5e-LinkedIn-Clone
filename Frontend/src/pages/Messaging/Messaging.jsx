import React from "react";
import Section from "../../components/common/section";
import UserInfoCart from "../../components/common/UserInfoCart";
import Button from "../../components/common/Button";
import FriendsList from "./componenets/friendsList";
import Chat from "./componenets/Chat";
import MessageInput from "./componenets/MessageInput";

function Messaging() {
  return (
    <div className="max-w-[100%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="col-span-1 md:col-span-9 p-4">
        {/* <Section> */}
          <div className="flex items-center justify-between">
            <div className="flex  gap-2 ">
              <p className="text-xl font-smbold text-linkedinGray">Messaging</p>
              <input
                type="text"
                placeholder="Search messages"
                className="p-2 border-2 rounded-md bg-[#EDF3F8] hover:border-black"
              />
            </div>
            <div className="flex">
              <Button />
              <Button />
            </div>
          </div>
          <div className="flex gap-2 border-y-[1px] my-2 py-2">
            <Button label={"Focused"} />
            <Button label={"Unread"} />
          </div>
          <div className="max-w-[100%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 ">
            <div className="md:col-span-4 p-4 border-r-[1px]">
              <FriendsList />
            </div>
            <div className="col-span-1 md:col-span-8 p-4">
              <Chat />
              <MessageInput />
            </div>
          </div>
        {/* </Section> */}
      </div>
      <div className="hidden md:block md:col-span-3  p-4">
        <UserInfoCart />
      </div>
    </div>
  );
}

export default Messaging;
