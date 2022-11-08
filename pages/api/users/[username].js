import nc from "next-connect";
import { findUserById, findUserByUsername } from "../../../utils/db/user";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import { auths } from "../../../middlewares";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await dbConnect();
  // console.log("req query username", req.query?.username);

  const user = await findUserByUsername(db, req.query.username);
  // console.log("user from api/users/:username", user);
  res.json({ user });

  //! This part comes from pages/user/[username]/index.js:
  //! There, it uses "getServerSideProps(context)" to access the params (username)
  //! The users ObjId is replaced to a normal "string Id"
  // user._id = String(user._id);
  // console.log("USER PROPS?? =>", { props: { user } });
  // return { props: { user } };
});

export default handler;
