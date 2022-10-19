import React from "react";
import Image from "next/image";
import ChatContact from "./ChatContact";

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
        <div class="py-2 pr-2">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#ffffff"
                fill-opacity=".7"
                d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
              ></path>
            </svg>
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#ffffff"
                fill-opacity=".7"
                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {/* HEADER END */}

      {/* CHATS START */}
      {chats ? (
        <div className="border-b border-grey-lighter flex-1 overflow-auto">
          {/* <div className="w-full h-20 flex flex-col justify-start items-start p-2 mb-2 rounded bg-primary text-primary-content place-content-center">
            <h2 className="text-xl bold text-gray-100">PANDA DEVS</h2>
            <p>There is no way!</p>
          </div> */}

          {chats.map((chat, i) => {
            // console.log("Chat only", chat);
            // console.log("Chat users0", chat.users[0].$oid);
            return (
              <ChatContact key={chat.$oid} user={user} chat={chat} i={i} />
            );
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
