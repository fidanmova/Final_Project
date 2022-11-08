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
  // currentUser i.e. => new ObjectId("634db22538ea5aba7b60a1dd")
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
  // Array of Objects with [{_id: new ObjectId("....")}]
  res.json({ usersChats });
});

export default handler;
