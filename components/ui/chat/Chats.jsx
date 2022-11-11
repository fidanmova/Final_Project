import React, { useContext } from "react";
import { Context } from "../../../utils/context/context";
import Image from "next/image";
import SendMessage from "./SendMessage";
import { MessageCard } from "../Card";
import { BiDotsVerticalRounded, BiSearch } from "react-icons/bi";
import { useMessagePages } from "../../../utils/message/hooks";

const Chats = ({ user }) => {
  const { groupMembers, selectedChat, chatObject } = useContext(Context);
  const { data } = useMessagePages({
    chatId: selectedChat ? selectedChat : null,
  });

  const messages = data
    ? data.reduce((acc, val) => [...acc, ...val.messages], [])
    : [];

  return (
    <div className="w-3/4 h-[90vh] min-h-[80vh] flex flex-col p-4 ml-4 bg-opacity-90 bg-gray-900 rounded-3xl text-xl uppercase border-2 border-gray-600">
      {/* HEADER START */}
      <div className="h-1/10 py-2 px-3 rounded-3xl rounded-b-none bg-gray-700 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-green-600 rounded-full m-0.5">
            <Image
              alt="Pic"
              width={80}
              height={80}
              className="rounded-full"
              src={`https://avatar.tobi.sh/${chatObject._id}`}
            />
          </div>
          <div className="ml-4">
            <p className="text-grey-darkest">
              {chatObject ? chatObject.chatName : "No chat selected"}
            </p>
            <p className="text-grey-darker text-base mt-1">
              {groupMembers.map((member) => `${member.username} `)}
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="hover:scale-110">
            <BiSearch />
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="ml-6 hover:scale-110">
            <BiDotsVerticalRounded />
          </div>
        </div>
      </div>
      {/* HEADER END */}
      {/* MESSAGE WINDOW START */}
      {messages ? (
        <div
          className={`flex flex-col-reverse h-full max-h-screen w-full py-2 px-3 bg-gray-800 flex-1 overflow-y-scroll scrollbar-hide border-gray-100`}
        >
          {messages.map((message, i) => {
            return <MessageCard key={i} message={message} user={user} />;
          })}
        </div>
      ) : (
        <div>NO MESSAGES</div>
      )}
      {/* MESSAGE WINDOW END */}

      {/* INPUT CHAT START */}
      <SendMessage />
      {/* INPUT CHAT END */}
    </div>
  );
};

export default Chats;
