import { ValidateProps } from "../../../models/schema";
import { findPosts, insertPost } from "../../../utils/db/post";
import { auths, validateBody } from "../../../middlewares";
import { dbConnect } from "./../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await dbConnect();

  const posts = await findPosts(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ posts });
});

handler.post(
  ...auths,
  validateBody({
    type: "object",
    properties: {
      content: ValidateProps.post.content,
      // postName: ValidateProps.post.postName,
    },
    required: ["content"],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await dbConnect();

    const post = await insertPost(db, {
      content: req.body.content,
      // postName: req.body.postName,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);

export default handler;
