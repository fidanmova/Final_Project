import React from "react";
import Image from "next/image";
import Message from "./Message"; // in chat app example called SingleChat
import { BiDotsVerticalRounded, BiSearch } from "react-icons/bi";
import { FaRegSmile, FaMicrophone } from "react-icons/fa";

// Mock Data
import { messages, chats } from "./data";

const Chats = ({ fetchAgain, setFetchAgain, user, selectedChat }) => {
  let isGroupChat = true;

  return (
    <div className="w-3/4 p-4 bg-opacity-90 bg-gray-900 rounded-3xl text-xl uppercase h-full min-h-screen border-2 border-gray-600">
      {/* HEADER START */}
      <div className="py-2 px-3 rounded-3xl rounded-b-none bg-gray-700 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-green-600 rounded-full m-0.5">
            <Image
              alt="Pic"
              width={60}
              height={60}
              className="rounded-full"
              src={
                user.avatar
                  ? "user.avatar not working lol"
                  : `https://avatar.tobi.sh/`
              }
            />
          </div>
          <div className="ml-4">
            <p className="text-grey-darkest">GROUP CHAT PANDA DEVS</p>
            <p className="text-grey-darker text-xs mt-1">
              Byron, Naty, Fidan, Olivia
            </p>
          </div>
        </div>

        <div className="flex">
          <div>
            <BiSearch />
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="ml-6">
            <BiDotsVerticalRounded />
          </div>
        </div>
      </div>
      {/* HEADER END */}
      {/* MESSAGE WINDOW START */}
      {messages ? (
        <div className="py-2 px-3 h-screen bg-gray-800 flex-1 overflow-auto justify-between items-center">
          {/* MESSAGE DATA NEEDED */}
          {messages.map((message, i) => (
            <Message
              key={i}
              message={message}
              user={user}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          ))}
        </div>
      ) : (
        <div>NO MESSAGES</div>
      )}
      {/* MESSAGE WINDOW END */}

      {/* INPUT CHAT START */}
      <div className="bg-gray-700 px-4 py-4 flex items-center rounded-3xl rounded-t-none">
        <div>
          <FaRegSmile />
        </div>
        <div className="flex-1 mx-4">
          <input className="w-full border rounded px-2 py-2" type="text" />
        </div>
        <div>
          <FaMicrophone />
        </div>
      </div>
      {/* INPUT CHAT END */}
    </div>
  );
};

export default Chats;
