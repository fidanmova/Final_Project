import React, { useContext } from "react";
import { Context } from "../../../utils/context/context";
import Image from "next/image";
import SendMessage from "./SendMessage";
// import Message from "./Message";
import { MessageCard } from "../Card";
import { BiDotsVerticalRounded, BiSearch } from "react-icons/bi";
import { FaRegSmile, FaMicrophone } from "react-icons/fa";
import { useMessagePages } from "../../../utils/message/hooks";
import { useAllUser } from "../../../utils/user/hooks";

const Chats = ({ user }) => {
  const { selectedChat, chatObject } = useContext(Context);
  const { data: allUsers } = useAllUser();
  const { data } = useMessagePages({
    chatId: selectedChat ? selectedChat : null,
  });

  const messages = data
    ? data.reduce((acc, val) => [...acc, ...val.messages], [])
    : [];

  console.log("allUsers =>", allUsers);

  // const members = (arr) => {
  //   if (chatObject.users != null || chatObject.users != undefined) {
  //     let groupMembers = chatObject.users;
  //     let member = groupMembers.map((user, i) => {
  //       console.log("member as user", user);
  //       let result = arr.includes((user) => user === user.id);
  //       return result;
  //     });
  //     return member;
  //   }
  // };
  // console.log("members(allUsers)", members(allUsers.users));

  return (
    <div className="w-3/4 h-full min-h-[90vh] flex flex-col p-4 ml-4 bg-opacity-90 bg-gray-900 rounded-3xl text-xl uppercase border-2 border-gray-600">
      {/* HEADER START */}
      <div className="h-1/10 py-2 px-3 rounded-3xl rounded-b-none bg-gray-700 flex flex-row justify-between items-center">
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
            <p className="text-grey-darkest">
              {chatObject ? chatObject.chatName : "No chat selected"}
            </p>
            <p className="text-grey-darker text-xs mt-1">
              {/* {chatObject.users &&
                chatObject.users.map((user, i) => {
                  const { data, error } = useUser(user);
                  console.log("chatMember", data);
                })} */}
              Chat members
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
        <div className="flex flex-col w-full h-full py-2 px-3 bg-gray-800 flex-1 overflow-y-scroll scrollbar-hide justify-between items-center">
          {messages.map((message, i) => (
            <MessageCard key={i} message={message} user={user} />
          ))}
        </div>
      ) : (
        <div>NO MESSAGES</div>
      )}
      {/* MESSAGE WINDOW END */}

      {/* INPUT CHAT START */}
      <SendMessage />
      {/* INPUT CHAT END */}
    </div>
  );
};

export default Chats;
