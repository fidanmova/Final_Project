import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../../utils/user/hooks";

import Chats from "./Chats";
import MyChats from "./MyChats";

const ChatPage = () => {
  const { data, error } = useCurrentUser();
  const user = data?.user;

  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full flex flex-col lg:flex-row items-center text-6xl uppercase space-y-4 lg:space-y-0 lg:flex-wrap lg:justify-center">
        {user && <MyChats user={user} />}
        {user && <Chats user={user} />}
      </div>
    </div>
  );
};

export default ChatPage;
