import ChatContact from "./ChatContact";
import { Input } from "react-daisyui";
import { MdMessage } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useChatPages } from "../../../utils/chat/hooks";
import CreateChatModal from "./CreateChatModal";

const MyChats = ({ user }) => {
  const { data } = useChatPages();

  const chats = data
    ? data.reduce((acc, val) => [...acc, ...val.usersChats], [])
    : [];

  return (
    <div
      className="lg:w-3/12 w-full lg:min-h-[90vh] lg:max-h-[90vh] h-[40vh] p-6 flex flex-col text-xl uppercase bg-gray-900/90
      lg:rounded-3xl rounded-sm border-2 border-gray-600"
    >
      {/* HEADER START */}
      <div className="flex justify-between items-center flex-nowrap">
        <h1 className="lg:text-4xl text-2xl uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500">My Chats</h1>
        <div className="">
          {/* For opening Modal from CreateModal Component */}
          <label
            htmlFor="my-modal"
            className="btn text-[1rem] lg:text-sm font-normal text-white border-2 bg-purple-900 p-2 rounded-xl hover:bg-purple-800 lg:w-40 w-36"
          >
            Add Group Chat +{" "}
          </label>
          <CreateChatModal />
        </div>
      </div>

      <div className="py-2 lg:py-3 flex flex-row justify-between items-center">
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
          <div className="hover:scale-110 ml-4">
            <MdMessage />
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="hover:scale-110 ml-4">
            <BiDotsVerticalRounded />
          </div>
        </div>
      </div>
      {/* HEADER END */}

      {/* CHATS START */}
      {chats ? (
        <div className="border-b flex-1 overflow-y-scroll scrollbar-hide bg-gray-800/50 max-h-screen rounded-sm">
          {chats &&
            chats?.map((chat, i) => {
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
