import { Button, Input, Text, Badge } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import { useChatPages } from "../../../utils/chat/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import UserListItem from "./UserListItem";
import UserBadge from "./UserBadge";

// import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateChatModel = () => {
  const [chats, setChats] = useState();
  const [chatName, setChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { mutate } = useChatPages();

  const { data: currentUser, error: userError } = useCurrentUser();
  // const loading = !data && !error;

  // handleGroup ==>> add user to selected array
  const handleChat = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setIsLoading(true);
      const data = await fetcher(`/api/users/search?search=${search}`);
      setIsLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("No user found.");
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chatName || !selectedUsers) {
      toast.error("No user found.");
      return;
    }
    try {
      const data = await fetcher(`/api/chats/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatName: chatName,
          users: selectedUsers.map((u) => u._id),
        }),
      });
      setChats([data, ...chats]);

      // mutate();
      toast("New group chat created.");
    } catch (error) {
      // console.log("error createChatModal =>", error);
      //toast.error("Failed to create the chat");
      toast.success("New group chat created.");
      // }
      [mutate];
    }
  };
  // const { mutate } = useChatPages();

  return (
    <>
      {/* The button to open modal */}
      {/* <label htmlFor="my-modal" className="btn">open modal</label> */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-96 min-h-96 overflow-y-scroll scrollbar-hide">
          <h1 className=" text-3xl mb-6">Create Chat Group</h1>
          <form onSubmit={handleSubmit} className=" ">
            <input
              placeholder="Chat Name"
              value={chatName}
              aria-label="chat name"
              onChange={(e) => setChatName(e.target.value)}
              className="text-base border-2 bg-blue-900 px-4 py-2 rounded-xl mb-7 w-full"
            />

            <input
              placeholder="Add Users "
              aria-label="users"
              onChange={(e) => handleSearch(e.target.value)}
              className="text-base border-2 bg-blue-900 px-4 py-2 rounded-xl w-full"
            />
          </form>
          <div className="w-full h-16 flex items-center flex-wrap my-4">
            {selectedUsers.map((u) => (
              <UserBadge
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </div>
          {isLoading ? (
            <div></div>
          ) : (
            searchResult?.slice(0, 3).map((user, i) => {
              return (
                <UserListItem
                  key={i}
                  user={user}
                  handleFunction={() => handleChat(user)}
                />
              );
            })
          )}

          <div className="modal-action">
            <Button
              className="text-m text-white bg-pink-600 p-3 rounded-xl hover:bg-gray-900"
              type="button"
              onClick={handleSubmit}

              // loading={isLoading}
            >
              Create Chat
            </Button>
            <label
              htmlFor="my-modal"
              className="btn text-white bg-pink-600 hover:bg-gray-900 "
              // loading={isLoading}
            >
              {" "}
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChatModel;
