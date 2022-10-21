import PageTemplate from "../../components/ui/PageTemplate";
import { dbConnect } from "../../utils/mongo/mongodb";
import { findChatByChatName } from "../../utils/db/chat";

export default function Chat({ singleChat }) {
  console.log("chatNAME", singleChat);
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed - CHAT">
      <title>{singleChat.chatName}</title>
      <h1>{singleChat.chatName}</h1>
      <p>{singleChat.users[0]}</p>
    </PageTemplate>
  );
}

export async function getServerSideProps(context) {
  const db = await dbConnect();

  const chat = await findChatByChatName(db, context.params.chatName);
  if (!chat) {
    return {
      notFound: true,
    };
  }

  let singleChat = await JSON.parse(JSON.stringify(chat));
  // console.log("CHAT =>", singleChat);
  return { props: { singleChat } };
}
