import nc from "next-connect";
// import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import { auths } from "../../../middlewares";
// import { findChatById, findChatByChatName } from "../../../utils/db";

const handler = nc(ncOpts);

handler.use(...auths);

// ! copied handler.get from /api/user/index.js
// ! => Does not work
handler.get(async (req, res) => {
  console.log("req", req.body);
  console.log("res", res.body);
  if (!req.chats) return res.json({ chats: null });
  return res.json({ chats: req.chats });
});

// ! "find() is not a function" ...
//! {"message":"db.collection(...).find(...).then is not a function"}
// handler.get(async (req, res) => {
//   const db = await dbConnect();
//   return db
//     .collection("chats")
//     .find()
//     .then((user) => {
//       console.log("IS HERE STH? =>", user);
//       user || null;
//     });
// });

export default handler;
