// import { ValidateProps } from "../../../models/schema";
import { isUserChatAdmin } from "../../../../../utils/db/chat";
import { auths, validateBody } from "../../../../../middlewares";
import { dbConnect } from "../../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  try {
    const db = await dbConnect();
    const chatId = req.query.chatId;
    const currentUser = req.user._id;
    //console.log("CHAT ID?", chatId, "CURRENT USER", currentUser);

    // check if the requester is admin/creator:
    const isCurrentUserAdmin = await isUserChatAdmin(db, chatId, currentUser);
    if (isCurrentUserAdmin) {
      res.send("You are the admin.");
    } else {
      res.status(400);
      throw new Error("Not authorized");
    }
  } catch (error) {
    console.error("EEERRRRORR", error);
    // res.status(404);
    throw new Error("Error");
  }
});

export default handler;
