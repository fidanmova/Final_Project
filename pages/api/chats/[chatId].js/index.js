import { nc } from "next-connect";
// import { findChatById } from "../../../../utils/db";
import { findChatByChatName } from "../../../../utils/db";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";

const handler = nc(ncOpts);

// GETS A CHAT VIA CHATNAME

handler.get(async (req, res) => {
  const db = await dbConnect();
  // const chat = await findChatById(db, req.query.chatId);
  const chat = await findChatByChatName(db, req.query.chatName);
  console.log("CHAT RESPONSE ?", chat);
  res.json({ chat });
});
