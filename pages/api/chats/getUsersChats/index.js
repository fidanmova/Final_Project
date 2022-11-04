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
  const currentUser = await req.user._id;
  const usersChats = await findUsersChats(
    db,
    currentUser,
    // req.query.before ? new Date(req.query.before) : undefined,
    req.query.by
    // req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  if (usersChats === null) {
    res.json("NO DATA");
  }

  res.json({ usersChats });
});

export default handler;
