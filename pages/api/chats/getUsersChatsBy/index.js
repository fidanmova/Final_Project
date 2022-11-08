import { findUsersChats } from "../../../../utils/db/chat";
import { auths } from "../../../../middlewares";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

//! Works:
handler.get(async (req, res) => {
  const db = await dbConnect();
  const currentUser = req.user;

  const usersChats = await findUsersChats(db, currentUser);

  if (usersChats === null) {
    res.json("NO DATA");
  }

  res.json({ usersChats });
});

export default handler;
