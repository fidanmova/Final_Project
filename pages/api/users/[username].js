import nc from "next-connect";
import { findUserByUsername } from "../../../utils/db/user";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import { auths } from "../../../middlewares";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await dbConnect();
  console.log("req query", req.query?.username);
  const user = await findUserByUsername(db, req.query?.username);
  res.json({ user });
});

export default handler;
