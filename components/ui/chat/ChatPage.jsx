import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../../utils/user/hooks";

import Chats from "./Chats";
import MyChats from "./MyChats";

const ChatPage = () => {
  const { data, error } = useCurrentUser();
  const user = data?.user;

  const loading = !data && !error;

  return (
    <div className="w-full h-full p-4 flex flex-col lg:flex-row items-start text-6xl uppercase">
      {user && <MyChats user={user} />}
      {user && <Chats user={user} />}
    </div>
  );
};

export default ChatPage;
