import nc from "next-connect";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";

const handler = nc(ncOpts);
// ## Events Handler ##

handler.get(async (req, res) => {
    const connect = await dbConnect();
    console.log("connect", connect);

    return db
        .collection("users")
        .find()
        .then((users) => users || null);
});

export default handler;
