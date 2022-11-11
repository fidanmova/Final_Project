import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../utils/context/context";
import Image from "next/image";
import SendMessage from "./SendMessage";
// import Message from "./Message";
import { MessageCard } from "../Card";
import { BiDotsVerticalRounded, BiSearch } from "react-icons/bi";
// import { FaRegSmile, FaMicrophone } from "react-icons/fa";
import { useMessagePages } from "../../../utils/message/hooks";
import { useAllUser } from "../../../utils/user/hooks";

const Chats = ({ user }) => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const { selectedChat, chatObject } = useContext(Context);
  const { data: allUsers } = useAllUser();
  const { data } = useMessagePages({
    chatId: selectedChat ? selectedChat : null,
  });

  const messages = data
    ? data.reduce((acc, val) => [...acc, ...val.messages], [])
    : [];

  useEffect(() => {
    fetch(`/api/users/forChat`) // get allUser
      .then((res) => res.json())
      .then(
        (results) => {
          // setAllUsersData(results.users);

          console.log("RESULTS useEffect", results);
          if (allUsersData.length === 0) {
            setAllUsersData(results.users);
          }
          if (
            chatObject &&
            Object.keys(chatObject).length === 0 &&
            Object.getPrototypeOf(chatObject) === Object.prototype
          ) {
            console.log("No chat selected");
          } else {
            let groupMembers = chatObject.users;
            console.log("chatObject =>", groupMembers);
            let groupMembersArray = [];
            groupMembers.map((groupMember, i) => {
              let result = allUsersData.filter(
                (member) => member._id === groupMember
              );
              console.log("res", result);
              groupMembersArray.push(result);
              console.log("groupMembersArray =>", groupMembersArray);
              return groupMembersArray;
            });
            const groupMembersAll = groupMembersArray.flat(1);
            setGroupMembers(groupMembersAll);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }, [chatObject, setAllUsersData, allUsersData]);

  return (
    <div className="w-3/4 h-[90vh] min-h-[80vh] flex flex-col p-4 ml-4 bg-opacity-90 bg-gray-900 rounded-3xl text-xl uppercase border-2 border-gray-600">
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
                  ? `${user.avatar}`
                  : `https://avatar.tobi.sh/${chatObject._id}`
              }
            />
          </div>
          <div className="ml-4">
            <p className="text-grey-darkest">
              {chatObject ? chatObject.chatName : "No chat selected"}
            </p>
            <p className="text-grey-darker text-base mt-1">
              {groupMembers.map((member) => `${member.username} `)}
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
        <div
          className={`flex flex-col h-full max-h-screen w-full py-2 px-3 bg-gray-800 flex-1 overflow-y-scroll scrollbar-hide border-gray-100`}
        >
          {messages.map((message, i) => {
            return <MessageCard key={i} message={message} user={user} />;
          })}
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
