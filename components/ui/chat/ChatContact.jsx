import React from "react";
import Image from "next/image";
import Link from "next/link";

const ChatContact = ({ user, chat, i }) => {
  return (
    <div
      onClick={(e) => {
        console.log("chatID Click from ChatContact", chat._id);
      }}
      className={`flex items-center cursor-pointer rounded-lg mt-1 ${
        i % 2 === 0 ? "bg-blue-900" : "bg-indigo-900"
      }`}
    >
      {/* <Link href={`/chats?${chat._id}`}>
        <a> */}
      <div className="ml-2">
        <Image
          width={60}
          height={60}
          alt={user.username}
          className="rounded-full"
          src={user.avatar ? "" : `https://avatar.tobi.sh/${chat._id}`}
        />
      </div>
      <div className="ml-4 pr-4 flex-1 py-4 ">
        <div className="flex items-bottom justify-between">
          <p className="">{chat.chatName}</p>
          {/* Here updated at needs to be added */}
          <p className="text-xs">12:45 pm</p>
        </div>
        {/* Here 'chat.latestMessage' needs to be added */}
        <p className="text-grey-dark mt-1 text-sm">Hello! Is it me ... ?</p>
      </div>
      {/* </a>
      </Link> */}
    </div>
  );
};

export default ChatContact;
