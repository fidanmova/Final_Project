import dbConnect from "../../utils/mongo/dbConnect";
import { sampleModel } from "../../models/sample";

export const allUser = async (req, res) => {
    const { method } = req;
    const conn = await dbConnect().catch((err) => console.error(err));
    console.log("Connect", conn);

    if (method === "GET") {
        const user = await sampleModel.find();
        res.json(user);
        console.log("User", user);
    }
};
