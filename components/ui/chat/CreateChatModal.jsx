import { Button, Input, Text, Badge } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import { useChatPages } from "../../../utils/chat/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import UserListItem from "./UserListItem";

// import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

const CreateChatModal = () => {
  const [chats, setChats] = useState();
  const [chatName, setChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { mutate } = useChatPages();

  const { data: currentUser, error: userError } = useCurrentUser();
  // const loading = !data && !error;

  // handleGroup
  const handleChat = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  console.log("selectedUsersARRAY =>", selectedUsers);

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
      // console.log("error createChatModal SUBMIT =>", error);
      toast.error("Failed to create the chat");
      // }
      // [mutate];
    }
  };

  // console.log("mutate", mutate);

  // const { mutate } = useChatPages();

  // const onChangeHandler = (e) => {
  //   setUserInput((prevUser) => ({
  //     ...prevUser,
  //     [e.target.name]: e.target.value,
  //   }));
  //   console.log();
  // };

  return (
    <div className="">
      <div className="">
        <h1 className="">Create Chat:</h1>
        <form onSubmit={handleSubmit}>
          <Input
            // ref={chatNameRef}
            // htmlType="chat name"
            value={chatName}
            placeholder="chat name"
            aria-label="chat name"
            onChange={(e) => setChatName(e.target.value)}
            // required
          />
          <Input
            // ref={usersRef}
            // htmlType="users"
            // value={selectedUsers}
            placeholder="user search:"
            aria-label="users"
            onChange={(e) => handleSearch(e.target.value)}
            // required
          />
          <Button
            // htmlType="submit"
            className=""
            type="success"
            loading={isLoading}
          >
            Create Chat
          </Button>
        </form>
        <div className="w-full h-20">
          {selectedUsers.map((u) => (
            <Badge
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </div>

        {isLoading ? (
          // <ChatLoading />
          <div>Loading...</div>
        ) : (
          searchResult?.slice(0, 4).map((user, i) => {
            return (
              <UserListItem
                key={i}
                user={user}
                handleFunction={() => handleChat(user)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default CreateChatModal;
