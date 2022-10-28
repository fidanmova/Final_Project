import nc from "next-connect";
// import { findUserById } from "../../../../utils/db";
import { findUserByUsername } from "../../../../utils/db/user";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";
import { auths } from "../../../../middlewares";

const handler = nc(ncOpts);

handler.use(...auths);

//! does not work!
handler.get(async (req, res) => {
  const db = await dbConnect();
  console.log(req.params.username);
  // const user = await findUserById(db, req.query.userId);
  const user = await findUserByUsername(db, req.params.username);
  // res.send("Hello world");
  res.json({ user });
});
