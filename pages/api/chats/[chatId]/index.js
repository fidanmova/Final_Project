// pages/chat/chatId

import PageTemplate from "../../../components/ui/PageTemplate";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { findChatById } from "../../../utils/db/chat";
import { useMessagePages } from "../../../utils/message/hooks";
// import Messages from "../../../components/ui/chat/Messages";

export default function Chat({ singleChat }) {
  // let chatId = selectedChat;
  // const {
  //   data: messageData,
  //   size,
  //   setSize,
  //   isLoadingMore,
  //   isReachingEnd,
  // } = useMessagePages();

  // console.log("messageData?", messageData);

  // const messages = messageData
  //   ? messageData.reduce((acc, val) => [...acc, ...val.messages], [])
  //   : [];

  console.log("chatNAME", singleChat);
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed - CHAT">
      <div>{singleChat.chatName}</div>
      {/* <Messages /> */}
    </PageTemplate>
  );
}

export async function getServerSideProps(context) {
  const db = await dbConnect();

  console.log("contextQueryChatId", context.query.chatId);

  const chat = await findChatById(db, context.query.chatId);
  if (!chat) {
    return {
      notFound: true,
    };
  }

  let singleChat = await JSON.parse(JSON.stringify(chat));
  return { props: { singleChat } };
}
