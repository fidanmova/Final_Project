import nc from "next-connect";
import { auths } from "../../../../middlewares";
import { findAllUsersForChat } from "../../../../utils/db/user";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await dbConnect();
  const users = await findAllUsersForChat(db);
  if (users === null) {
    res.json("NO DATA");
  }
  res.json({ users });
});

export default handler;
