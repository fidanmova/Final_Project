import { ValidateProps } from "../../../../../models/schema";
import { findChatById, findAllChats } from "../../../../../utils/db/chat";
import {
  findMessages,
  insertMessage,
  trialAddMembersToMessages,
} from "../../../../../utils/db/message";
import { auths, validateBody } from "../../../../../middlewares";
import { dbConnect } from "../../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

//! Works:
handler.get(async (req, res) => {
  // console.log("req.query api/chats/chatId => ", req.query.chatId);
  const db = await dbConnect();
  let id = req.query?.chatId;
  const chat = await findChatById(db, id);

  if (!chat) {
    return res.status(404).json({ error: { message: "Chat is not found." } });
  }

  const messages = await findMessages(
    db,
    id,
    req.query.by
    // req.query.before ? new Date(req.query.before) : undefined,
    // req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

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
