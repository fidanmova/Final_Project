import React, { useContext, useMemo } from "react";
import { Context } from "../../../utils/context/context";
import { format } from "@lukeed/ms";
import Image from "next/image";

const ChatContact = ({ user, chat, i }) => {
  const { setSelectedChat, setChatObject } = useContext(Context);

  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(chat.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return "Just now";
    return `${format(diff, true)} ago`;
  }, [chat.createdAt]);

  return (
    <div
      onClick={(e) => {
        setSelectedChat(chat._id);
        setChatObject(chat);
      }}
      className={`flex items-center cursor-pointer rounded-lg mt-1 p-1 ${
        i % 2 === 0 ? "bg-blue-900" : "bg-indigo-900"
      }`}
    >
      <Image
        width={55}
        height={55}
        alt={chat.chatName}
        className="rounded-full"
        src={`https://avatar.tobi.sh/${chat._id}`}
      />
      <div className="ml-4 pr-4 flex-1 py-4 ">
        <div className="flex items-bottom justify-between">
          <p className="">{chat.chatName}</p>
          <p className="text-xs">{timestampTxt}</p>
        </div>
        {/* Here 'chat.latestMessage' needs to be added */}
        {/* <p className="text-grey-dark mt-1 text-sm">Hello! Is it me ... ?</p> */}
      </div>
    </div>
  );
};

export default ChatContact;
