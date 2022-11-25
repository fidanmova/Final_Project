import React from "react";
import Link from "next/link";

const Links = ({ style }) => {
  return (
    <>
      <Link href="/circle">
        <p
          className={`text-red-500  rounded-lg cursor-pointer hover:bg-red-500/50 hover:text-gray-300 p-2 ${style}`}
        >
          CIRCLE
        </p>
      </Link>
      <Link href="/chats">
        <p
          className={`text-purple-500  rounded-lg cursor-pointer hover:bg-purple-500/50 hover:text-gray-300 p-2 ${style}`}
        >
          CHAT
        </p>
      </Link>{" "}
      <Link href="/events">
        <p
          className={`text-blue-500  rounded-lg cursor-pointer hover:bg-blue-500/50 hover:text-gray-300 p-2 ${style}`}
        >
          EVENTS
        </p>
      </Link>
      <Link href="/job">
        <p
          className={`text-pink-500  rounded-lg cursor-pointer hover:bg-pink-500/50 hover:text-gray-300 p-2 ${style}`}
        >
          JOBS
        </p>
      </Link>
      <Link href="/editor">
        <p
          className={`text-yellow-500  rounded-lg cursor-pointer hover:bg-yellow-500/50 hover:text-gray-300 p-2 ${style}`}
        >
          CODE
        </p>
      </Link>
    </>
  );
};

export default Links;
