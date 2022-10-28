import { ValidateProps } from "../../../models/schema";
import { findChats, insertChat } from "../../../utils/db/chat";
import { auths, validateBody } from "../../../middlewares";
import { dbConnect } from "./../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await dbConnect();

  const chats = await findChats(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by
    // req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  if (chats === null) {
    res.json("NO DATA");
  }
  res.json({ chats });
});

handler.post(
  ...auths,
  validateBody({
    type: "object",
    properties: {
      content: ValidateProps.chat.content,
    },
    additionalProperties: true,
  }),
  async (req, res) => {
    console.log("req from api/chats", req);
    console.log("res from api/chats", res);
    console.log("req.user from api/chats", req.user);
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await dbConnect();

    const chat = await insertChat(db, {
      content: req.chat.content,
      creatorId: req.user._id,
    });

    return res.json({ chat });
  }
);

export default handler;

// import nc from "next-connect";
// // import { dbConnect } from "../../../utils/mongo/mongodb";
// import { ncOpts } from "../../../utils/nc";
// import { auths } from "../../../middlewares";
// // import { findChatById, findChatByChatName } from "../../../utils/db";

// const handler = nc(ncOpts);

// handler.use(...auths);

// // ! copied handler.get from /api/user/index.js
// // ! => Does not work
// handler.get(async (req, res) => {
//   console.log("req", req.body);
//   console.log("res", res.body);
//   if (!req.chats) return res.json({ chats: null });
//   return res.json({ chats: req.chats });
// });

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
