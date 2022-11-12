import { findChatById } from "../../../../utils/db/chat";
import { findMessages, insertMessage } from "../../../../utils/db/message";
import { auths, validateBody } from "../../../../middlewares";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

//! Works:
handler.get(async (req, res) => {
  const db = await dbConnect();
  const chat = await findChatById(db, chatId);

  if (!chat) {
    return res.status(404).json({ error: { message: "Chat is not found." } });
  }

  const messages = await findMessages(db, chatId);
  return res.json({ messages });
});

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }
  const db = await dbConnect();
  const content = req.body.content;

  const chat = await findChatById(db, req.query.chatId);

  if (!chat) {
    return res.status(404).json({ error: { message: "Chat not found." } });
  }

  const message = await insertMessage(db, chat._id, {
    creatorId: req.user._id,
    content,
  });

  return res.json({ message });
});

export default handler;
