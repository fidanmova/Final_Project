import React, { useState } from "react";
import ChatContact from "./ChatContact";
import { Input } from "react-daisyui";
import { MdMessage } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useChatPages } from "../../../utils/chat/hooks";
import CreateChatModal from "./CreateChatModal";

const MyChats = ({ fetchAgain, user, selectedChat }) => {
  const { data: currentUser, error } = useCurrentUser();
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useChatPages();

  const chats = data
    ? data.reduce((acc, val) => [...acc, ...val.usersChats], [])
    : [];

  return (
    <div
      className="w-1/4 h-full p-6 flex flex-col text-xl uppercase bg-opacity-90 bg-gray-800
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
          <label
            htmlFor="my-modal"
            className="btn text-sm border-2 bg-blue-900 p-2 rounded-xl"
          >
            Add Group Chat +{" "}
          </label>
          <CreateChatModal />
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
        <div className="border-b border-grey-lighter flex-1  overflow-y-scroll scrollbar-hide">
          {chats.map((chat, i) => {
            return (
              <ChatContact
                key={i}
                user={user}
                chat={chat}
                i={i}
                onClick={() => {
                  setSelectedChat(chat._id);
                  console.log("selChat? =>", selectedChat);
                }}
              />
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {/* CHATS END */}
    </div>
  );
};

//! This can be used to have the "Chats Window" to be rendered in the same component
//! to use maybe "selectedChat/setSelectedChat":
// const Chats = ({ selectedChat, user }) => {
//   let chatId = selectedChat;
//   console.log("ChatId ============>", selectedChat);
//   // const {
//   //   data: messageData,
//   //   size,
//   //   setSize,
//   //   isLoadingMore,
//   //   isReachingEnd,
//   // } = useMessagePages();

//   // console.log("messageData?", messageData);

//   // const messages = messageData
//   //   ? messageData.reduce((acc, val) => [...acc, ...val.messages], [])
//   //   : [];

//   return (
//     <div className="w-3/4 h-full flex flex-col p-4 ml-4 bg-opacity-90 bg-gray-900 rounded-3xl text-xl uppercase border-2 border-gray-600">
//       {/* HEADER START */}
//       <div className="h-1/10 py-2 px-3 rounded-3xl rounded-b-none bg-gray-700 flex flex-row justify-between items-center">
//         <div className="flex items-center">
//           <div className="w-14 h-14 bg-green-600 rounded-full m-0.5">
//             {/* <Image
//               alt="Pic"
//               width={60}
//               height={60}
//               className="rounded-full"
//               src={
//                 user.avatar
//                   ? "user.avatar not working lol"
//                   : `https://avatar.tobi.sh/`
//               }
//             /> */}
//           </div>
//           <div className="ml-4">
//             <p className="text-grey-darkest">GROUP CHAT PANDA DEVS</p>
//             <p className="text-grey-darker text-xs mt-1">
//               Byron, Naty, Fidan, Olivia
//             </p>
//           </div>
//         </div>

//         <div className="flex">
//           <div>
//             <BiSearch />
//           </div>

//           {/* ADDITIONAL OPTIONS */}
//           <div className="ml-6">
//             <BiDotsVerticalRounded />
//           </div>
//         </div>
//       </div>
//       {/* HEADER END */}
//       {/* MESSAGE WINDOW START */}
//       <h1>{selectedChat}</h1>
//       {messages ? (
//         <div className="flex flex-col w-full h-full py-2 px-3 bg-gray-800 flex-1 overflow-auto justify-between items-center">
//           {/* MESSAGE DATA NEEDED */}
//           {messages.map((message, i) => (
//             <MessageCard key={i} message={message} user={user} />
//           ))}
//         </div>
//       ) : (
//         <div>NO MESSAGES</div>
//       )}
//       {/* MESSAGE WINDOW END */}

//       {/* INPUT CHAT START */}
//       <SendMessage />
//       {/* <div className="bg-gray-700 px-4 py-4 flex items-center rounded-3xl rounded-t-none">
//         <div>
//           <FaRegSmile />
//         </div>
//         <div className="flex-1 mx-4">
//           <input className="w-full border rounded px-2 py-2" type="text" />
//         </div>
//         <div>
//           <FaMicrophone />
//         </div>
//       </div> */}
//       {/* INPUT CHAT END */}
//     </div>
//   );
// };

export default MyChats;
