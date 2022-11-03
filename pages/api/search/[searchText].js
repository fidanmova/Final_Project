import nc from "next-connect";
import { ncOpts } from "../../../utils/nc";
import auths from "../../../middlewares/auth";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { findUserBySearchText } from "../../../utils/db/user";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await dbConnect();
  try {
    const { searchText } = req.query;
    const { user } = req;

    if (searchText.length === 0) return;

    const results = await findUserBySearchText(db, searchText);
    console.log("results =>", results); // returns Array of Objects

    const resultsToBeSent =
      results.length > 0 &&
      results.filter((result) => {
        console.log("RES to STRING", result._id.toString()); // sends ids as strings
        return result._id.toString() !== user._id;
      });

    console.log("ResSent", resultsToBeSent);
    return res
      .status(200)
      .json(resultsToBeSent.length > 0 ? resultsToBeSent : results);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

export default handler;
