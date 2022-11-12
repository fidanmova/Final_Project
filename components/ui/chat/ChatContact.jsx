import React, { useContext, useMemo } from "react";
import { Context } from "../../../utils/context/context";
import { format } from "@lukeed/ms";
import Image from "next/image";

const ChatContact = ({ chat, i }) => {
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
      className={`flex items-center cursor-pointer rounded-lg mt-2 p-2 hover:bg-blue-800 ${
        i % 2 === 0 ? "bg-blue-900" : "bg-indigo-900"
      }`}
    >
      <div className="w-3/12 flex justify-center items-center">
        <Image
          width={60}
          height={60}
          alt={chat.chatName}
          className="rounded-full"
          src={`https://avatar.tobi.sh/${chat._id}`}
        />
      </div>
      <div className="ml-4 pr-4 flex-1 py-2 ">
        <div className="flex flex-col justify-between">
          <p className="">{chat.chatName}</p>
          <p className="text-xs  text-left w-full">{timestampTxt}</p>
        </div>
        {/* <p> {groupMembers.map((member) => `${member.username} `)}</p> */}
        {/* Here 'latestMessage' can be added */}
        {/* <p className="text-grey-dark mt-1 text-sm">Hello! Is it me ... ?</p> */}
      </div>
    </div>
  );
};

export default ChatContact;
