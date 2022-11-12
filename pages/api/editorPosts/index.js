import {
  findEditorMessages,
  insertEditorMessage,
} from "../../../utils/db/editor";
import { auths } from "../../../middlewares";
import { dbConnect } from "./../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await dbConnect();
  const messages = await findEditorMessages(db);
  res.json({ messages });
});

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const db = await dbConnect();

  const message = await insertEditorMessage(db, {
    content: req.body.content,
    creatorId: req.user._id,
  });

  return res.json({ message });
});

export default handler;
