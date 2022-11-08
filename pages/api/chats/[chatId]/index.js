// import { ValidateProps } from "../../../models/schema";
import { findChatById } from "../../../../utils/db/chat";
import { auths, validateBody } from "../../../../middlewares";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

//! Works:
handler.get(async (req, res) => {
  console.log("req.query api/chats/chatId => ", req.query);
  const db = await dbConnect();
  let id = req.query?.chatId;
  console.log("REq Query ChatId from api/chats/chatId", id);
  const chat = await findChatById(db, id);
  return res.json({ chat });
});

export default handler;
