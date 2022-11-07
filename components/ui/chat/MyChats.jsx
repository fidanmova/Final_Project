import React, { useState } from "react";
import Image from "next/image";
import ChatContact from "./ChatContact";
import { Form, Input, Button } from "react-daisyui";
import { MdMessage } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useChatPages, useChat } from "../../../utils/chat/hooks";
import { fetcher } from "../../../utils/fetcher";
import { toast } from "react-toastify";
import UserListItem from "./UserListItem";
import CreateChatModal from "./CreateChatModal";



// Mock Data
// import { messages, chats } from "./data";

const MyChats = ({ fetchAgain, user, selectedChat }) => {
  const { data: currentUser, error } = useCurrentUser();

  const { mutate } = useChatPages();



  // console.log("MyChats currentUser =>", currentUser);

  const { data, size, setSize, isLoadingMore, isReachingEnd } = useChatPages();
  // console.log("MyChats data =>", useChatPages());

  const chats = data
    ? data.reduce((acc, val) => [...acc, ...val.usersChats], [])
    : [];

  // console.log("======================== chats", chats);

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
        <div className="">
          {/* For opening Modal from CreateModal Component */}
        <label htmlFor="my-modal" className="btn text-sm border-2 bg-blue-900 p-2 rounded-xl">Add Group Chat + </label>
   <CreateChatModal/> 
    </div>
      
      
      </div>

      <div className="py-3 bg-grey-lighter flex flex-row justify-between items-center">
        {/* SEARCH START */}
        <div className="py-2 pr-2">
          <Input
            type="text"
            className="w-full px-2 py-2 text-sm rounded bg-gray-700"
            placeholder="Search or start new chat"
            // value={search}
            // onChange={(e) => handleSearch(e.target.value)}
          />
          {/* <Button
            // htmlType="submit"
            className=""
            type="success"
            loading={isLoading}
          >
            Create Chat
          </Button> */}
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
            // console.log("chat from JSX", chat);
            // return (
            //   <div key={i}>
            //     <div>{chat.content}</div>
            //   </div>
            // );
            return <ChatContact key={i} user={user} chat={chat} i={i} />;
          })}
        </div>
      ) : (
          <div>Loading...</div>
      )}
      {/* CHATS END */}
    </div>
  );
};

export default MyChats;

