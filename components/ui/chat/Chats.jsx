import React from "react";
import Image from "next/image";
import Message from "./Message"; // in chat app example called SingleChat

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#ffffff"
                fill-opacity=".7"
                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
              ></path>
            </svg>
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="ml-6">
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
      {/* MESSAGE WINDOW START */}
      {messages ? (
        <div className="py-2 px-3 h-screen bg-gray-800 flex-1 overflow-auto justify-between items-center">
          {/* MESSAGE DATA NEEDED */}
          {messages.map((message, i) => (
            <Message
              key={message.$oid}
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
      <div class="bg-gray-700 px-4 py-4 flex items-center rounded-3xl rounded-t-none">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="#ffffff"
              opacity=".8"
              d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
            ></path>
          </svg>
        </div>
        <div class="flex-1 mx-4">
          <input class="w-full border rounded px-2 py-2" type="text" />
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="#ffffff"
              fill-opacity=".8"
              d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
            ></path>
          </svg>
        </div>
      </div>
      {/* INPUT CHAT END */}
    </div>
  );
};

export default Chats;
