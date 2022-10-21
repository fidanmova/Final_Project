import nc from "next-connect";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";

const handler = nc(ncOpts);
// ## Events Handler ##

handler.get(async (req, res) => {
  await dbConnect();
  return db
    .collection("berlin_oct_2022")
    .find()
    .then((user) => user || null);
});

export default handler;
