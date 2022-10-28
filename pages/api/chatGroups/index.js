import { ValidateProps } from "../../../models/schema";
import {
  findAllChatGroups,
  insertChatGroup,
} from "../../../utils/db/chatGroups";
import { auths, validateBody } from "../../../middlewares";
import { dbConnect } from "./../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await dbConnect();
  const chatGroups = await findAllChatGroups(db);
  res.json(chatGroups);
});

handler.post(
  ...auths,
  // validateBody({
  //   type: "object",
  //   properties: {
  //     users: ValidateProps.chatGroup.users,
  //   },
  //   additionalProperties: true,
  // }),
  async (req, res) => {
    console.log("req.body from api/chatGroups", req.body);
    if (!req.body) {
      return res.status(401).end();
    }
    const usersArray = [req.body.username];
    // console.log("!", usersArray);
    const db = await dbConnect();

    const chatGroup = await insertChatGroup(db, {
      users: usersArray,
      creatorId: req.body.creator,
      // creatorId: req.user._id,
    });

    return res.json({ chatGroup });
  }
);

export default handler;
