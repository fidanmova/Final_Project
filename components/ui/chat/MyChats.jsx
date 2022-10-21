import React from "react";
import Image from "next/image";
import ChatContact from "./ChatContact";
import { MdMessage } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";

// Mock Data
import { messages, chats } from "./data";

const MyChats = ({ fetchAgain, user, selectedChat }) => {
  // let avatar = defaultProfilePicture();
  return (
    <div
      className="w-1/4 h-full p-6 mr-4
      flex flex-col
      text-xl uppercase
      bg-opacity-90 bg-gray-800
      rounded-3xl  border-2 border-gray-600"
    >
      {/* HEADER START */}
      <div className="flex justify-between items-center flex-nowrap">
        {/* <img
          className="w-10 h-10 rounded-full"
          src="http://andressantibanez.com/res/avatar.png"
        /> */}
        <h1 className="text-2xl">My Chats</h1>
        <div className="text-sm border-2 bg-blue-900 p-2 rounded-xl">
          Add Group Chat <button>+</button>
        </div>
      </div>

      <div className="py-3 bg-grey-lighter flex flex-row justify-between items-center">
        {/* SEARCH START */}
        <div className="py-2 pr-2">
          <input
            type="text"
            className="w-full px-2 py-2 text-sm rounded bg-gray-700"
            placeholder="Search or start new chat"
          />
        </div>
        {/* SEARCH END */}

        <div className="flex">
          {/* ADD CHAT / SINGLE CHAT? */}
          <div className="ml-4">
            <MdMessage />
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="ml-4">
            <BiDotsVerticalRounded />
          </div>
        </div>
      </div>
      {/* HEADER END */}

      {/* CHATS START */}
      {chats ? (
        <div className="border-b border-grey-lighter flex-1 overflow-auto">
          {chats.map((chat, i) => {
            return <ChatContact key={i} user={user} chat={chat} i={i} />;
          })}
        </div>
      ) : (
        <div>LOADING</div>
      )}
      {/* CHATS END */}
    </div>
  );
};

export default MyChats;
