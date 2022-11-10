import ChatContact from "./ChatContact";
import { Input } from "react-daisyui";
import { MdMessage } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useChatPages } from "../../../utils/chat/hooks";
import CreateChatModal from "./CreateChatModal";

const MyChats = ({ user }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useChatPages();

  const chats = data
    ? data.reduce((acc, val) => [...acc, ...val.usersChats], [])
    : [];

  return (
    <div
      className="w-1/4 min-h-[90vh] max-h-[90vh] p-6 flex flex-col text-xl uppercase bg-opacity-90 bg-gray-800/90
      rounded-3xl  border-2 border-gray-600"
    >
      {/* HEADER START */}
      <div className="flex justify-between items-center flex-nowrap">
        <h1 className="text-4xl">My Chats</h1>
        <div className="">
          {/* For opening Modal from CreateModal Component */}
          <label
            htmlFor="my-modal"
            className="btn text-sm text-white border-2 bg-blue-900 p-2 rounded-xl"
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
        <div className="border-b border-grey-lighter flex-1 overflow-y-scroll scrollbar-hide max-h-screen">
          {chats.map((chat, i) => {
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
