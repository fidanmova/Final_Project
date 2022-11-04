import { ValidateProps } from "../../../models/schema";
import { findPosts, insertPost, findUsersPosts } from "../../../utils/db/post";
import { auths, validateBody } from "../../../middlewares";
import { dbConnect } from "./../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await dbConnect();
  const currentUser = await req.user._id;
  const posts = await findUsersPosts(
    db,
    currentUser,
    // req.query.before ? new Date(req.query.before) : undefined,
    req.query.by
    // req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );
  res.json({ posts });
});

handler.post(
  ...auths,
  validateBody({
    type: "object",
    properties: {
      content: ValidateProps.post.content,
    },
    required: ["content"],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await dbConnect();

    const post = await insertPost(db, {
      content: req.body.content,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);

export default handler;
