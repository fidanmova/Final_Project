import React from "react";
import Image from "next/image";

const ChatContact = ({ user, chat, i }) => {
  return (
    <div
      class={`flex items-center cursor-pointer rounded-lg mt-1 ${
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
      <div class="ml-4 pr-4 flex-1 py-4 ">
        <div class="flex items-bottom justify-between">
          <p class="">{chat.chatName}</p>
          {/* Here updated at needs to be added */}
          <p class="text-xs">12:45 pm</p>
        </div>
        {/* Here 'chat.latestMessage' needs to be added */}
        <p class="text-grey-dark mt-1 text-sm">Hello! Is it me ... ?</p>
      </div>
    </div>
  );
};

export default ChatContact;
