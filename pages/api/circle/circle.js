import nc from "next-connect";
import { getAllUsers } from "../../../utils/db/allUsers";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";

const handler = nc(ncOpts);
// ## Events Handler ##

handler.get(async (req, res) => {
    const db = await dbConnect();

    const users = await getAllUsers(db);

    res.json(users);
});

export default handler;
