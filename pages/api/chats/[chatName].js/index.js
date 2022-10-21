import nc from "next-connect";
// import { findChatById } from "../../../../utils/db";
import { findChatByChatName } from "../../../../utils/db";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";
import { auths } from "../../../middlewares";

const handler = nc(ncOpts);

// handler.get(async (req, res) => {
//   const db = await dbConnect();
//   // const chat = await findChatById(db, req.query.chatId);
//   const chat = await findChatByChatName(db, req.query.chatName);
//   res.json({ chat });
// });
handler.use(...auths);

// ! copied handler.get from /api/user/index.js
//! => Does not work
handler.get(async (req, res) => {
  console.log("req", req.body);
  console.log("res", res.body);
  if (!req.chat) return res.json({ chat: null });
  // return res.json({ chat: req.chat });
  return res.send("HELLLLLOOOOOO");
});

//! copied handler.get from api/users/[userId]/index.js
//! => Does not work
// handler.get(async (req, res) => {
//   const db = await dbConnect();
//   const user = await findUserById(db, req.query.userId);
//   res.send("Hello world");
//   // res.json({ user });
// });
