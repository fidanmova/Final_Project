import nc from "next-connect";
import { findUserByUsernameSearch } from "../../../../utils/db/user";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";
import { auths } from "../../../../middlewares";

const handler = nc(ncOpts);

handler.use(...auths);

// Path example: http://localhost:3000/api/users/search?search=fidan
handler.get(async (req, res) => {
  const db = await dbConnect();
  const keyword = req.query.search;

  //console.log("keyword", keyword);
  const users = await findUserByUsernameSearch(db, keyword);
  //console.log("users after keyword search", users);
  res.send(users);

  //! This part comes from pages/user/[username]/index.js:
  //! There, it uses "getServerSideProps(context)" to access the params (username)
  //! The users ObjId is replaced to a normal "string Id"
  // user._id = String(user._id);
  // console.log("USER PROPS?? =>", { props: { user } });
  // return { props: { user } };
});

export default handler;
