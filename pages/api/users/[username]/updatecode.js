import nc from "next-connect";
import { ncOpts } from "../../../../utils/nc";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { updateUserCode } from "../../../../utils/db/user";
import { auths } from "../../../../middlewares";
const handler = nc(ncOpts);
handler.use(...auths);

handler.post(async (req, res) => {
  console.log("\u001b[33m", req.body, "\u001b[0m");
  const db = await dbConnect();
  const codeRes = await updateUserCode(db, req.body.userId, req.body.code);
  res.json(codeRes);
});

export default handler;
