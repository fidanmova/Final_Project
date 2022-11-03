import nc from "next-connect";
import { findUserById } from "../../../utils/db/user";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import { auths } from "../../../middlewares";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await dbConnect();
  console.log("req query userId", req.query?.userId);
  const user = await findUserById(db, req.query.userId);
  res.json({ user });
});

export default handler;
