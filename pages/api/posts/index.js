import { ValidateProps } from "../../../models/schema";
import { findAllPosts, insertPost } from "../../../utils/db/post";
import { auths, validateBody } from "../../../middlewares";
import { dbConnect } from "./../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

// finds all Posts
handler.get(async (req, res) => {
  const db = await dbConnect();
  const posts = await findAllPosts(db);
  res.json({ posts });
});

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const db = await dbConnect();

  const post = await insertPost(db, {
    content: req.body.content,
    creatorId: req.user._id,
  });

  return res.json({ post });
});

export default handler;
