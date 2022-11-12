// import { ValidateProps } from "../../../models/schema";
import { findAllChats, insertChat } from "../../../utils/db/chat";
import { auths, validateBody } from "../../../middlewares";
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

//! Works:
<<<<<<< HEAD
handler.post(
  ...auths,
  // validateBody({
  //   type: "object",
  //   properties: {
  //     users: ValidateProps.chat.users,
  //   },
  //   additionalProperties: true,
  // }),
  async (req, res) => {
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
=======
handler.post(...auths, async (req, res) => {
  console.log("req.body from api/chats", req.body);
  if (!req.body) {
    return res.status(401).end();
>>>>>>> e1f4a0c1fc1a4608d6efb4639069ee39a203d876
  }
  let users = req.body.users;
  const chatName = req.body.chatName;

  const db = await dbConnect();
  const chat = await insertChat(db, {
    chatName,
    users: users,
    creatorId: req.user._id,
  });
  console.log("chat", chat);
  return res.json({ chat });
});

export default handler;
