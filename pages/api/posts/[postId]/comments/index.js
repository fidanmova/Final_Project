import { ValidateProps } from "../../../../../models/schema";
import { findPostById } from "../../../../../utils/db/post";
import { findComments, insertComment } from "../../../../../utils/db/comment";
import { auths, validateBody } from "../../../../../middlewares";
import { dbConnect } from "../../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await dbConnect();
  const post = await findPostById(db, req.query.postId);

  if (!post) {
    return res.status(404).json({ error: { message: "Post is not found." } });
  }

  const comments = await findComments(
    db,
    req.query.postId
    // req.query.before ? new Date(req.query.before) : undefined,
    // req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  return res.json({ comments });
});

handler.post(
  ...auths,
  // validateBody({
  //   type: "object",
  //   properties: {
  //     content: ValidateProps.comment.content,
  //   },
  //   required: ["content"],
  //   additionalProperties: false,
  // }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await dbConnect();

    console.log(" CONTENT from api/.../comments=>", req.body.content);
    // const content = req.body.content;
    const content = JSON.stringify(req.body.content);
    console.log(" CONTENT from api/.../comments=>", content);
    console.log(" Curr User from api/.../comments=>", req.user);

    const post = await findPostById(db, req.query.postId);

    if (!post) {
      return res.status(404).json({ error: { message: "Post is not found." } });
    }

    const comment = await insertComment(db, post._id, {
      creatorId: req.user._id,
      content: content,
    });

    return res.json({ comment });
  }
);

export default handler;
