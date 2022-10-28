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

// export async function getServerSideProps(context) {
//   const db = await dbConnect();

//   // let resData = context.res;
//   let reqData = context.req.cookies.sess;
//   console.log("COOKIE SESSION? context =>", reqData);
//   // let userId = user._id;

//   const allUserChats = await findAllChats(db);
//   if (!allUserChats) {
//     return {
//       notFound: true,
//     };
//   }
//   let allChats = await JSON.parse(JSON.stringify(allUserChats));
//   // console.log("CHAT =>", allChats);
//   return { props: { allChats } };
// }

export default chats;
