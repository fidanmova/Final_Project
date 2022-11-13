import ChatPage from "../components/ui/chat/ChatPage";
import PageTemplate from "../components/ui/PageTemplate";
// import { findallChatsUserId } from "../utils/db/chat";
// import { findAllChats } from "../utils/db/chat";
// import { useCurrentUser } from "../utils/user/hooks";

// import { dbConnect } from "../utils/mongo/mongodb";

const chats = () => {
  // console.log("USER CHATS", allChats);
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Chat">
      <ChatPage />
    </PageTemplate>
  );
};

export default chats;
