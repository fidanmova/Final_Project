import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../../utils/user/hooks";
import Chats from "./Chats";
import MyChats from "./MyChats";

// mock data
import { messages, chats } from "./data";

const ChatPage = () => {
  const { data, error } = useCurrentUser();
  console.log("Chatpage data", data, error);
  const loading = !data && !error;

  //! I add these atm here as we don't have a context for the chats
  // if changed to true, will display clicked chat.
  const [fetchAgain, setFetchAgain] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedChat, setSelectedChat] = useState({});
  const [chats, setChats] = useState();

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <div className="container mx-auto h-full uppercase text-4xl flex shadow-lg pt-2">
      {user && (
        <MyChats
          fetchAgain={fetchAgain}
          user={user}
          setSelectedChat={setSelectedChat}
        />
      )}
      {user && (
        <Chats
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          user={user}
          selectedChat={selectedChat}
        />
      )}
    </div>
  );
};

export default ChatPage;
