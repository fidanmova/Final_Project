// import { ValidateProps } from "../../../models/schema";
import {
  findAllChats,
  insertChat,
  isUserChatAdmin,
  deleteChat,
} from "../../../utils/db/chat";
import { auths } from "../../../middlewares";
import { dbConnect } from "./../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

// works to get all chats:
handler.get(async (req, res) => {
  const db = await dbConnect();
  const chats = await findAllChats(db, req.query.by);
  if (chats === null) {
    res.json("NO DATA");
  }

  res.json({ chats });
});

handler.post(...auths, async (req, res) => {
  //console.log("req.body from api/chats", req.body);
  if (!req.body) {
    return res.status(401).end();
  }
  let users = req.body.users;
  const chatName = req.body.chatName;

  const db = await dbConnect();
  const chat = await insertChat(db, {
    chatName,
    users: users,
    creatorId: req.user._id,
  });
  //console.log("chat", chat);
  return res.json({ chat });
});

handler.delete(async (req, res) => {
  const db = await dbConnect();
  const { chatId } = req.body;
  const currentUser = req.user._id;

  try {
    //check if the requester is admin/creator:
    const isCurrentUserAdmin = await isUserChatAdmin(db, chatId, currentUser);

    if (isCurrentUserAdmin) {
      const deletedChat = await deleteChat(db, chatId, currentUser);
      res.json(deletedChat);
    } else {
      res.status(400);
      throw new Error("Not authorized");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});
export default handler;
