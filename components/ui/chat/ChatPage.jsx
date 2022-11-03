import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../../utils/user/hooks";
// import { useAllChats } from "../../../utils/chat/hooks";

import Chats from "./Chats";
import MyChats from "./MyChats";

// mock data
// import { messages, chats } from "./data";

const ChatPage = ({ allChats }) => {
  const { data, error } = useCurrentUser();
  const user = data?.user;

  const loading = !data && !error;

  //! I add these atm here as we don't have a context for the chats
  // if changed to true, will display clicked chat.
  const [fetchAgain, setFetchAgain] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedChat, setSelectedChat] = useState({});
  // const [chats, setChats] = useState();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <div className="container mx-auto h-full uppercase text-4xl flex shadow-lg pt-2">
      {user && (
        <MyChats
          fetchAgain={fetchAgain}
          user={user}
          allChats={allChats}
          setSelectedChat={setSelectedChat}
        />
      )}
      {user && (
        <Chats
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          user={user}
          allChats={allChats}
          selectedChat={selectedChat}
        />
      )}
    </div>
  );
};

export default ChatPage;
