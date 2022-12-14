import ChatPage from "../components/ui/chat/ChatPage";
import PageTemplate from "../components/ui/PageTemplate";

const chats = () => {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Chat">
      <ChatPage />
    </PageTemplate>
  );
};

export default chats;
