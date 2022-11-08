// import { ValidateProps } from "../../../models/schema";
import {
  findChatByIdAndDeleteUser,
  isUserChatAdmin,
} from "../../../../utils/db/chat";
import { auths, validateBody } from "../../../../middlewares";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(...auths);

handler.put(async (req, res) => {
  const db = await dbConnect();
  const { chatId, userId } = req.body;
  const currentUser = req.user;

  try {
    //check if the requester is admin/creator:
    const isCurrentUserAdmin = await isUserChatAdmin(db, chatId, currentUser);

    if (isCurrentUserAdmin) {
      const updatedUsers = await findChatByIdAndDeleteUser(db, chatId, userId);
      res.send("The User has been deleted from the chat group.");
    } else {
      res.status(400);
      throw new Error("Not authorized");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export default handler;
