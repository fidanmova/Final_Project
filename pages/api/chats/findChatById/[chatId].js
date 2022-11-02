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
  const db = await dbConnect();

  console.log("chatId => ", req.query?.chatId);
  let id = req.query?.chatId;
  const chat = await findChatById(db, id);
  res.json({ chat });

  if (!chat) {
    return res.status(404).json({ error: { message: "Chat is not found." } });
  }
});

export default handler;
