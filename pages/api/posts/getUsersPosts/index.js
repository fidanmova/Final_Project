import { findUsersPosts } from "../../../../utils/db/post";
import { auths, validateBody } from "../../../../middlewares";
import { dbConnect } from "./../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await dbConnect();
  const currentUser = await req.user._id;
  console.log("api/posts/getUsersChats => currentUser", currentUser);
  // currentUser => new ObjectId("634db22538ea5aba7b60a1dd")
  const usersPosts = await findUsersPosts(
    db,
    currentUser,
    // req.query.before ? new Date(req.query.before) : undefined,
    req.query.by
    // req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  if (usersPosts === null) {
    res.json("NO DATA");
  }
  // Array of Objects with [{_id: new ObjectId("....")}]
  res.json({ usersPosts });
});

export default handler;
