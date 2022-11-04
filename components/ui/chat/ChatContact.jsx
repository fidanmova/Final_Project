import React from "react";
import Image from "next/image";

const ChatContact = ({ user, chat, i }) => {
  console.log("chat from chatContact", chat);
  console.log("user from chatContact", user);
  console.log("i from chatContact", i);

  return (
    <div
      className={`flex items-center cursor-pointer rounded-lg mt-1 ${
        i % 2 === 0 ? "bg-blue-900" : "bg-indigo-900"
      }`}
    >
      <div className="ml-2">
        <Image
          width={60}
          height={60}
          alt={user.username}
          className="rounded-full"
          src={user.avatar ? "" : `https://avatar.tobi.sh/${chat.$oid}`}
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
    </div>
  );
};

export default ChatContact;
