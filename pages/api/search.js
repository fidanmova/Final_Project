import nc from "next-connect";
import { ncOpts } from "../../utils/nc";
import auths from "../../middlewares/auth";
import passport from "../../utils/auth/passport";

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  try {
    const { searchText } = req.params;
    const { userId } = req;

    if (searchText.length === 0) return;

    let userPattern = new RegExp(`^${searchText}`);

    const results = await UserModel.find({
      name: { $regex: userPattern, $options: "i" },
    });

    const resultsToBeSent =
      results.length > 0 &&
      results.filter((result) => result._id.toString() !== userId);

    return res
      .status(200)
      .json(resultsToBeSent.length > 0 ? resultsToBeSent : results);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});
