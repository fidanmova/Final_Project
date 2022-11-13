import React, { useContext, useEffect } from "react";
import { Context } from "../../../utils/context/context";
import Image from "next/image";
import SendMessage from "./SendMessage";
import { MessageCard } from "../Card";
import { BiDotsVerticalRounded, BiSearch } from "react-icons/bi";
import { GoTrashcan } from "react-icons/go";
import { useMessagePages } from "../../../utils/message/hooks";
import { toast } from "react-toastify";
import { fetcher } from "../../../utils/fetcher";

const Chats = ({ user }) => {
  const { groupMembers, selectedChat, chatObject } = useContext(Context);
  const { data } = useMessagePages({
    chatId: selectedChat ? selectedChat : null,
  });

  const messages = data
    ? data.reduce((acc, val) => [...acc, ...val.messages], [])
    : [];

  const deleteChat = async (selectedChat, chatObject) => {
    try {
      if (selectedChat) {
        const response = await fetcher(`/api/chats/`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId: selectedChat,
          }),
        });
        console.log("response", response);
        toast.error(`Chat deleted.`);
      } else {
        toast("Wooohoo");
      }
    } catch (error) {
      console.error(error);
      toast.error("You are not authorized to delete this chat.");
    }
  };

  return (
    <div className="lg:w-8/12 w-full h-[90vh] min-h-[80vh] flex flex-col p-4 lg:ml-4 bg-gray-900/80 lg:rounded-3xl rounded-sm text-xl uppercase border-2 border-gray-600">
      {/* HEADER START */}
      <div className="h-1/10 py-2 px-3 lg:rounded-t-3xl rounded-t-sm rounded-b-none bg-gray-700/60 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-green-600 rounded-full m-0.5">
            <Image
              alt="Pic"
              width={80}
              height={80}
              className="rounded-full"
              src={`https://avatar.tobi.sh/${chatObject?._id}`}
            />
          </div>
          <div className="ml-4">
            <p className="text-grey-darkest">
              {chatObject && chatObject?.chatName}
            </p>
            <p className="text-grey-darker text-base mt-1">
              {selectedChat !== null &&
                chatObject !== null &&
                groupMembers?.length >= 0 &&
                groupMembers?.map((member) => `${member.username} `)}
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="hover:scale-110">
            <BiSearch />
          </div>

          <div className="ml-6 hover:scale-110">
            <GoTrashcan onClick={() => deleteChat(selectedChat, chatObject)} />
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="ml-6 hover:scale-110">
            <BiDotsVerticalRounded />
          </div>
        </div>
      </div>
      {/* HEADER END */}
      {/* MESSAGE WINDOW START */}
      {messages ? (
        <div
          className={`flex flex-col-reverse h-full max-h-screen w-full lg:py-2 lg:px-3 bg-gray-800/50 flex-1 overflow-y-scroll scrollbar-hide border-gray-100`}
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
