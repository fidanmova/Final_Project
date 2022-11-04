import { ValidateProps } from "../../../../../models/schema";
import { findChatById } from "../../../../../utils/db/chat";
import { findMessages, insertComment } from "../../../../../utils/db/comment";
import { auths, validateBody } from "../../../../../middlewares";
import { dbConnect } from "../../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await dbConnect();

  const chat = await findChatById(db, req.query.chatId);

  if (!chat) {
    return res.status(404).json({ error: { message: "Chat is not found." } });
  }

  const messages = await findMessages(
    db,
    req.query.chatId,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  return res.json({ messages });
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

    const content = req.body.content;

    const post = await findChatById(db, req.query.chatId);

    if (!post) {
      return res.status(404).json({ error: { message: "Post is not found." } });
    }

    const comment = await insertComment(db, post._id, {
      creatorId: req.user._id,
      content,
    });

    return res.json({ comment });
  }
);

export default handler;
